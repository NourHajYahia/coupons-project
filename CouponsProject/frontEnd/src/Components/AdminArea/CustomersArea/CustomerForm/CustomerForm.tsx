import {
   Avatar,
   Button,
   CardMedia,
   CssBaseline,
   makeStyles,
   TextField,
   Theme,
   Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import CustomerModel from "../../../../Models/CustomerModel";
import {
   CustomerAddedAction,
   CustomerUpdatedAction,
} from "../../../../Redux/CustomersState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(2),
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
         margin: theme.spacing(1),
      },
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   input: {
      display: "none",
   },
   img: {
      maxHeight: 300,
      maxWidth: 300,
   },
}));

function CustomerForm(props: {
   add?: boolean;
   customer?: CustomerModel;
   handleClose: Function;
}): JSX.Element {
   const classes = useStyles();
   const { register, handleSubmit, setValue } = useForm<CustomerModel>();
   const [img, setImage] = useState(
      props.add ? null : globals.urls.getImage + props.customer.image
   );
   const handleChangeImage = (event: SyntheticEvent) => {
      if ((event.target as HTMLInputElement).files[0]) {
         setValue("multiPartImage", (event.target as HTMLInputElement).files);
         setImage(
            URL.createObjectURL((event.target as HTMLInputElement)?.files[0])
         );
      }
   };

   async function send(customer: CustomerModel) {
      try {
         const formData = new FormData();
         if (props.customer) {
            formData.append("id", props.customer.id.toString());
         }
         if (customer.firstName) {
            formData.append("firstName", customer.firstName);
         }
         if (customer.lastName) {
            formData.append("lastName", customer.lastName);
         }
         formData.append("email", customer.email);
         formData.append("password", customer.password);
         if (customer.multiPartImage) {
            formData.append("multiPartImage", customer.multiPartImage[0]);
         }
         if (props.add) {
            const response = await JwtAxios.post<CustomerModel>(
               globals.urls.addCustomer,
               formData
            );
            store.dispatch(CustomerAddedAction(response.data));
         } else {
            const response = await JwtAxios.put<CustomerModel>(
               globals.urls.updateCustomer,
               formData
            );
            store.dispatch(CustomerUpdatedAction(response.data));
         }
         props.handleClose();
      } catch (err) {
         notify.error(err);
      }
   }
   return (
      <div className="CustomerForm">
         <CssBaseline />
         <div className={classes.root}>
            <Typography variant="h5">
               {props.add ? "Add Customer" : "Update Customer"}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(send)}>
               {img && (
                  <CardMedia
                     component="img"
                     className={classes.img}
                     image={img}
                     title="Contemplative Reptile"
                  />
               )}
               <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handleChangeImage}
               />

               <Button>
                  <label htmlFor="icon-button-file">
                     <Avatar id="icon-button-file" className={classes.avatar}>
                        <PhotoCamera />
                     </Avatar>
                  </label>
               </Button>

               <TextField
                  required={props.add && true}
                  variant="outlined"
                  id="firstName"
                  fullWidth
                  placeholder={props.customer?.firstName}
                  label="First Name"
                  name="firstName"
                  autoFocus
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  inputProps={{
                     minLength: 3,
                     maxLength: 10,
                  }}
                  {...register("firstName")}
               />
               <TextField
                  required={props.add && true}
                  variant="outlined"
                  id="lastName"
                  fullWidth
                  placeholder={props.customer?.lastName}
                  label="Last Name"
                  name="lastName"
                  autoFocus
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  inputProps={{
                     minLength: 3,
                     maxLength: 10,
                  }}
                  {...register("lastName")}
               />

               <TextField
                  variant="outlined"
                  required={props.add && true}
                  id="email"
                  fullWidth
                  placeholder={props.customer?.email}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  {...register("email")}
               />

               <TextField
                  variant="outlined"
                  required={props.add && true}
                  fullWidth
                  placeholder={props.customer?.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoFocus
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  inputProps={{
                     minLength: 3,
                     maxLength: 15,
                  }}
                  {...register("password")}
               />

               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  submit
               </Button>
            </form>
         </div>
      </div>
   );
}

export default CustomerForm;
