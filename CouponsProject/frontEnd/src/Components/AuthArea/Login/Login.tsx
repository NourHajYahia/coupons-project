import {
   Avatar,
   Button,
   Container,
   CssBaseline,
   FormControl,
   InputLabel,
   makeStyles,
   Select,
   TextField,
   Theme,
   Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClientType } from "../../../Models/ClientType";
import CompanyModel from "../../../Models/CompanyModel";
import CredentialsModel from "../../../Models/CredentialsModel";
import CustomerModel from "../../../Models/CustomerModel";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notifications";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router";
import ClientModel from "../../../Models/ClientModel";

const useStyles = makeStyles((theme: Theme) => ({
   paper: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(7),
      "& > *": {
         width: "100%",
         margin: theme.spacing(1),
      },
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function Login(): JSX.Element {
   const [clientType, setClientType] = useState<string>("");
   const classes = useStyles();
   const { register, handleSubmit, setValue } = useForm<CredentialsModel>();
   const history = useHistory();

   async function send(credentials: CredentialsModel) {
      try {
         const loginResp = await axios.post<string>(
            globals.urls.login +
               "?clientType=" +
               credentials.clientType +
               "&email=" +
               credentials.email +
               "&password=" +
               credentials.password
         );
         const headers = {
            token: "Bearer " + loginResp.data,
         };

         switch (credentials.clientType) {
            case ClientType.Administrator:
               store.dispatch(
                  loginAction(
                     new ClientModel(
                        loginResp.data,
                        credentials.clientType,
                        "Admin"
                     )
                  )
               );
               history.push("/admin");
               break;
            case ClientType.Company:
               const companyInfoResp = await axios.get<CompanyModel>(
                  globals.urls.getCompanyInfo,
                  { headers }
               );
               store.dispatch(
                  loginAction(
                     new ClientModel(
                        loginResp.data,
                        credentials.clientType,
                        companyInfoResp.data
                     )
                  )
               );
               history.push("/company");
               break;
            case ClientType.Customer:
               const customerInfoResp = await axios.get<CustomerModel>(
                  globals.urls.getCustomerInfo,
                  { headers }
               );
               store.dispatch(
                  loginAction(
                     new ClientModel(
                        loginResp.data,
                        credentials.clientType,
                        customerInfoResp.data
                     )
                  )
               );
               history.push("/customer");
               break;
         }
         notify.success("You are successfully logged in");
      } catch (err) {
         notify.error("Wrong email or password");
      }
   }

   const handleClientChange = (event: React.ChangeEvent<{ value: any }>) => {
      let clientType = event.target.value as ClientType;
      setClientType(clientType);
      setValue("clientType", clientType);
   };
   return (
      <div className="Login">
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign in
               </Typography>
               <form className={classes.form} onSubmit={handleSubmit(send)}>
                  <TextField
                     variant="outlined"
                     required
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     {...register("email")}
                  />
                  <TextField
                     variant="outlined"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     {...register("password")}
                  />

                  <FormControl variant="outlined">
                     <InputLabel id="client-type">Client Type</InputLabel>
                     <Select
                        native
                        value={clientType}
                        onChange={handleClientChange}
                        id="client-type"
                        label="Client Type"
                        required>
                        <option aria-label="None" value="" />
                        {Object.entries(ClientType).map((obj) => (
                           <option key={obj[0]} value={obj[1]}>
                              {obj[0]}
                           </option>
                        ))}
                     </Select>
                  </FormControl>
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.submit}>
                     Sign In
                  </Button>
               </form>
            </div>
         </Container>
      </div>
   );
}

export default Login;
