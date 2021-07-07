import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ClientType } from "../../../../Models/ClientType";
import CustomerModel from "../../../../Models/CustomerModel";
import { CustomersDownloadedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";
import CustomerCardManager from "../CustomerCardManager/CustomerCardManager";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: "0 auto",
   },
   cardManager: {
      margin: theme.spacing(1),
   },
}));

function CustomersList(props: {
   filterValue?: string;
   filterType?: number;
}): JSX.Element {
   const classes = useStyles();
   const [customers, setCustomers] = useState<CustomerModel[]>([
      ...store.getState().customerState.customers,
   ]);

   useEffect(() => {
      const unsubscribeMe = store.subscribe(() => {
         setCustomers([...store.getState().customerState.customers]);
      });
      return () => {
         unsubscribeMe();
      };
   });

   useEffect(() => {
      let isCanceled = false;
      const fetchCustomersById = async () => {
         try {
            const response = await JwtAxios.get<CustomerModel>(
               globals.urls.getCustomer,
               {
                  params: { customerId: props.filterValue },
               }
            );
            if (!isCanceled) {
               setCustomers([response.data]);
            }
         } catch (err) {
            notify.error(err);
         }
      };

      const fetchAllCustomers = async () => {
         if (
            store.getState().authState.client?.clientType ===
               ClientType.Administrator &&
            store.getState().customerState.customers.length === 0
         ) {
            try {
               const response = await JwtAxios.get<CustomerModel[]>(
                  globals.urls.getAllCustomers
               );
               if (!isCanceled) {
                  setCustomers(response.data);
                  store.dispatch(CustomersDownloadedAction(response.data));
               }
            } catch (err) {
               notify.error(err);
            }
         } else {
            if (!isCanceled) {
               setCustomers([...store.getState().customerState.customers]);
            }
         }
      };

      if (props.filterType === 1 && props.filterValue) {
         fetchCustomersById();
      } else {
         fetchAllCustomers();
      }

      return () => {
         isCanceled = true;
      };
   }, [props.filterType, props.filterValue]);

   const customersFiltered = (): CustomerModel[] => {
      if (props.filterType === 0) {
         return customers.filter((customer) =>
            (customer.firstName + customer.lastName)
               .toLowerCase()
               .includes(props.filterValue.toLowerCase())
         );
      }
      return customers;
   };

   return (
      <div className="CustomersList">
         <div className={classes.root}>
            <Grid container justify="center">
               {customersFiltered()?.map((customer) => (
                  <Grid className={classes.cardManager} key={customer.id} item>
                     <CustomerCardManager customer={customer} />
                  </Grid>
               ))}
            </Grid>
         </div>
      </div>
   );
}

export default CustomersList;
