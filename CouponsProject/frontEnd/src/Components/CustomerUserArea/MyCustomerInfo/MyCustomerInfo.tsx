import {
   Box,
   Button,
   ButtonGroup,
   CardMedia,
   CssBaseline,
   makeStyles,
   Paper,
   Theme,
   Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ClientType } from "../../../Models/ClientType";
import CustomerModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
   box: {
      display: "flex",
      alignItems: "center",
      margin: "0 auto",
      "& > *": {
         marginRight: theme.spacing(5),
      },
   },
   input: {
      display: "none",
   },
   img: { maxHeight: 1000, maxWidth: 1000 },

   root: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
         marginBottom: theme.spacing(5),
      },
   },
   groupButton: {},
}));

function MyCustomerInfo(): JSX.Element {
   const [customer, setCustomer] = useState<CustomerModel>();
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      if (
         store.getState().authState.client?.clientType === ClientType.Company
      ) {
         notify.error("You are not Authorized");
         history.push("/");
      } else {
         setCustomer(
            store.getState().authState.client?.clientInfo as CustomerModel
         );
      }
   }, [customer, history]);

   const handleClickBack = () => {
      history.push("/customer");
   };

   return (
      <div className="MyCustomerInfo">
         <CssBaseline />
         <Paper className={classes.root}>
            <Typography variant="h3" align="center">
               My Info
            </Typography>

            <Box>
               <CardMedia
                  className={classes.img}
                  component="img"
                  image={globals.urls.getImage + customer?.image}
                  title="Contemplative Reptile"
               />
            </Box>
            <Box className={classes.box}>
               <Typography color="textPrimary" id="firstName" variant="h5">
                  First Name:
               </Typography>
               <Typography color="textSecondary" id="firstName" variant="h5">
                  {customer?.firstName}
               </Typography>
            </Box>
            <Box className={classes.box}>
               <Typography color="textPrimary" id="lastName" variant="h5">
                  Last Name:
               </Typography>
               <Typography color="textSecondary" id="lastName" variant="h5">
                  {customer?.lastName}
               </Typography>
            </Box>
            <Box className={classes.box}>
               <Typography color="textPrimary" id="email" variant="h5">
                  Email:
               </Typography>
               <Typography color="textSecondary" id="email" variant="h5">
                  {customer?.email}
               </Typography>
            </Box>
            <ButtonGroup
               size="large"
               variant="contained"
               className={classes.groupButton}
               color="primary"
               aria-label="contained primary button group">
               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleClickBack}>
                  Back
               </Button>
            </ButtonGroup>
         </Paper>
      </div>
   );
}

export default MyCustomerInfo;
