import { Card, ClickAwayListener, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import CompanyModel from "../../../../Models/CompanyModel";
import { CompanyDeletedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";
import ManagerActionsMenu from "../../ManagerActionsMenu/ManagerActionsMenu";
import CompanyCard from "../CompanyCard/CompanyCard";
import CompanyForm from "../CompanyForm/CompanyForm";

const useStyles = makeStyles((theme: Theme) => ({
   displayCard: {
      boxSizing: "border-box",
      boxShadow: theme.shadows[5],
      width: 280,
      height: 450,
      margin: "0 auto",
   },
   formCard: {
      width: 280,
      maxHeight: 800,
      overflow: "auto",
      margin: "0 auto",
   },
}));

function CompanyCardManager(props: { company: CompanyModel }): JSX.Element {
   const classes = useStyles();
   const [updateOn, setUpdateOn] = useState<boolean>(false);

   const openUpdate = () => {
      setUpdateOn(true);
   };
   const closeUpdate = () => {
      setUpdateOn(false);
   };

   async function deleteCompany() {
      try {
         const companyId = Number(props.company.id);
         const response = await JwtAxios.delete<string>(
            globals.urls.deleteCompany + "?companyId=" + companyId
         );
         store.dispatch(CompanyDeletedAction(props.company.id));
         notify.success(response.data);
      } catch (err) {
         notify.error(err);
      }
   }

   return (
      <ClickAwayListener onClickAway={closeUpdate}>
         <div className="CompanyCardManager">
            {updateOn ? (
               <Card className={classes.formCard}>
                  <CompanyForm
                     company={props.company}
                     handleClose={closeUpdate}
                  />
               </Card>
            ) : (
               <Card className={classes.displayCard}>
                  <CompanyCard company={props.company} />
                  <ManagerActionsMenu
                     onDelete={deleteCompany}
                     onUpdate={openUpdate}
                     infoPath={"/admin/companies/" + props.company.id}
                  />
               </Card>
            )}
         </div>
      </ClickAwayListener>
   );
}

export default CompanyCardManager;
