import { Button, makeStyles, Modal, Paper, Theme } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { ClientType } from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notifications";
import CategoryList from "../../Shared/CategoriesList/CategoryList";
import CouponsSearchBar from "../../Shared/CouponsSearchBar/CouponsSearchBar";
import CouponForm from "../CouponForm/CouponForm";
import CompanyCouponsList from "../CompanyCouponsList.tsx/CompanyCouponsList";
import { useHistory } from "react-router";

function getModalStyle() {
   const top = 50;
   const left = 50;

   return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
   };
}

const useStyles = makeStyles((theme: Theme) => ({
   add: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "2px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 0, 1),
      maxWidth: 350,
      maxHeight: 800,
      overflow: "auto",
      margin: "0 auto",
   },
   companyHome: {
      display: "flex",
      flexDirection: "column",
   },
   companyBar: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      top: 0,
      zIndex: 1,
      position: "sticky",
      marginBottom: theme.spacing(1),
   },
   category: {
      display: "flex",
      margin: "0 auto",
      flexDirection: "row",
      marginBottom: 15,
      width: "100%",
   },
   icon: {
      margin: "auto",
      height: 40,
      width: 40,
   },
   searchBar: {
      marginLeft: 15,
      flexGrow: 1,
   },
}));

function CompanyHome(): JSX.Element {
   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);
   const [modalOpen, setModalOpen] = React.useState(false);
   const history = useHistory();

   useEffect(() => {
      const clientType = store.getState().authState.client?.clientType;
      if (!clientType || clientType !== ClientType.Company) {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [history]);

   const handleOpen = () => {
      setModalOpen(true);
   };

   const handleClose = () => {
      setModalOpen(false);
   };

   return (
      <div className={classes.companyHome}>
         <div>
            <Paper className={classes.companyBar}>
               <div className={classes.searchBar}>
                  <CouponsSearchBar />
               </div>
               <Button onClick={handleOpen}>
                  <AddCircle className={classes.icon} color="primary" />
               </Button>
            </Paper>
            <CategoryList />
         </div>
         <div>
            <CompanyCouponsList />
         </div>
         <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-add">
            <div id="modal-add" className={classes.add} style={modalStyle}>
               <CouponForm add handleClose={handleClose} />
            </div>
         </Modal>
      </div>
   );
}

export default CompanyHome;
