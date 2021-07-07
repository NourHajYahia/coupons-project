import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ClientType } from "../../../../Models/ClientType";
import CompanyModel from "../../../../Models/CompanyModel";
import { CompaniesDownloadedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";
import CompanyCardManager from "../CompanyCardManager/CompanyCardManager";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: "0 auto",
   },
   cardManager: {
      margin: theme.spacing(1),
   },
}));

function CompaniesList(props: {
   filterValue?: string;
   filterType?: number;
}): JSX.Element {
   const classes = useStyles();
   const [companies, setCompanies] = useState<CompanyModel[]>([
      ...store.getState().companiesState.companies,
   ]);

   useEffect(() => {
      const unsubscribeMe = store.subscribe(() => {
         setCompanies([...store.getState().companiesState.companies]);
      });
      return () => {
         unsubscribeMe();
      };
   });

   useEffect(() => {
      let isCanceled = false;
      const fetchCompanyById = async () => {
         try {
            const response = await JwtAxios.get<CompanyModel>(
               globals.urls.getCompany,
               {
                  params: { companyId: props.filterValue },
               }
            );
            if (!isCanceled) {
               setCompanies([response.data]);
            }
         } catch (err) {
            notify.error(err);
         }
      };
      const fetchAllCompanies = async () => {
         if (
            store.getState().authState.client?.clientType ===
               ClientType.Administrator &&
            store.getState().companiesState.companies.length === 0
         ) {
            try {
               const response = await JwtAxios.get<CompanyModel[]>(
                  globals.urls.getAllCompanies
               );
               if (!isCanceled) {
                  setCompanies([...response.data]);
                  store.dispatch(CompaniesDownloadedAction(response.data));
               }
            } catch (err) {
               notify.error(err);
            }
         } else {
            if (!isCanceled) {
               setCompanies([...store.getState().companiesState.companies]);
            }
         }
      };
      if (props.filterType === 1 && props.filterValue) {
         fetchCompanyById();
      } else {
         fetchAllCompanies();
      }

      return () => {
         isCanceled = true;
      };
   }, [props.filterType, props.filterValue]);

   const companiesFiltered = (): CompanyModel[] => {
      if (props.filterType === 0) {
         return companies.filter((company) =>
            company.name.toLowerCase().includes(props.filterValue.toLowerCase())
         );
      }
      return companies;
   };

   return (
      <div className="CompaniesList">
         <div className={classes.root}>
            <Grid container justify="center">
               {companiesFiltered()?.map((company) => (
                  <Grid className={classes.cardManager} key={company.id} item>
                     <CompanyCardManager company={company} />
                  </Grid>
               ))}
            </Grid>
         </div>
      </div>
   );
}

export default CompaniesList;
