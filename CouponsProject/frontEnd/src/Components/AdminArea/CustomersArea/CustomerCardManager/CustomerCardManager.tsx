import { Card, ClickAwayListener, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import CustomerModel from "../../../../Models/CustomerModel";
import { CustomerDeletedAction } from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";
import ManagerActionsMenu from "../../ManagerActionsMenu/ManagerActionsMenu";
import CustomerCard from "../CustomerCard/CustomerCard";
import CustomerForm from "../CustomerForm/CustomerForm";

const useStyles = makeStyles((theme: Theme) => ({
   displayCard: {
      width: 280,
      height: 475,
      margin: "0 auto",
      boxShadow: theme.shadows[8],
      boxSizing: "border-box",
   },
   formCard: {
      width: 270,
      maxHeight: 800,
      overflow: "auto",
      margin: "0 auto",
   },
}));

function CustomerCardManager(props: { customer: CustomerModel }): JSX.Element {
   const classes = useStyles();
   const [update, setUpdate] = useState<boolean>(false);

   const openUpdate = () => {
      setUpdate(true);
   };
   const closeUpdate = () => {
      setUpdate(false);
   };

   async function deleteCustomer() {
      try {
         const customerId = Number(props.customer.id);
         const response = await JwtAxios.delete<string>(
            globals.urls.deleteCustomer + "?customerId=" + customerId
         );
         store.dispatch(CustomerDeletedAction(props.customer.id));
         notify.success(response.data);
      } catch (err) {
         notify.error(err);
      }
   }

   return (
      <ClickAwayListener onClickAway={closeUpdate}>
         <div className="CustomerCardManager">
            {update ? (
               <Card className={classes.formCard}>
                  <CustomerForm
                     customer={props.customer}
                     handleClose={closeUpdate}
                  />
               </Card>
            ) : (
               <Card className={classes.displayCard}>
                  <CustomerCard customer={props.customer} />
                  <ManagerActionsMenu
                     onDelete={deleteCustomer}
                     onUpdate={openUpdate}
                     infoPath={"/admin/customers/" + props.customer.id}
                  />
               </Card>
            )}
         </div>
      </ClickAwayListener>
   );
}

export default CustomerCardManager;
