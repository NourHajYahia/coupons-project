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
import { useHistory, useParams } from "react-router";
import { ClientType } from "../../../../Models/ClientType";
import CustomerModel from "../../../../Models/CustomerModel";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: theme.spacing(2),
      background: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
         marginBottom: theme.spacing(5),
      },
   },
   box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      marginBottom: theme.spacing(2),
      width: "100%",
      "& > *": {
         marginRight: theme.spacing(5),
      },
   },
   input: {
      display: "none",
   },
   img: { maxHeight: 800, maxWidth: 800 },
}));

function CustomerInfo(): JSX.Element {
   const { id }: { id: string } = useParams();
   const [customer, setCustomer] = useState<CustomerModel>(
      store
         .getState()
         .customerState.customers.find((customer) => customer.id === +id)
   );
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      if (
         store.getState().authState.client?.clientType !==
         ClientType.Administrator
      ) {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [history]);

   useEffect(() => {
      const fetchCustomer = async () => {
         try {
            const response = await JwtAxios.get<CustomerModel>(
               globals.urls.getCustomer,
               {
                  params: {
                     customerId: +id,
                  },
               }
            );

            setCustomer(response.data);
         } catch (err) {
            history.push("/pageNotFound");
         }
      };
      if (!customer) {
         fetchCustomer();
      }
   }, [customer, history, id]);

   const handleClickBack = () => {
      history.push("/admin/customers");
   };

   return (
      <div className="CustomerInfo">
         <CssBaseline />
         <Paper className={classes.root}>
            <Typography component="h1" variant="h1" align="center">
               Customer Info
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
            <Box className={classes.box}>
               <Typography color="textPrimary" id="password" variant="h5">
                  Password:
               </Typography>
               <Typography color="textSecondary" id="password" variant="h5">
                  {customer?.password}
               </Typography>
            </Box>
            <ButtonGroup
               size="large"
               variant="contained"
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

export default CustomerInfo;
