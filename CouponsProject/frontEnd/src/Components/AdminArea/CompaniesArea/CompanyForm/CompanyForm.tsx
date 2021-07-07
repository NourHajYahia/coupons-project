import {
   Avatar,
   Button,
   CardMedia,
   makeStyles,
   TextField,
   Theme,
   Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import CompanyModel from "../../../../Models/CompanyModel";
import {
   CompanyAddedAction,
   CompanyUpdatedAction,
} from "../../../../Redux/CompaniesState";
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

function CompanyForm(props: {
   add?: boolean;
   company?: CompanyModel;
   handleClose: Function;
}): JSX.Element {

   const classes = useStyles();
   const { register, handleSubmit, setValue } = useForm<CompanyModel>();
   const [img, setImage] = useState(
      props.add ? null : globals.urls.getImage + props.company.image
   );

   const handleChangeImage = (event: SyntheticEvent) => {
      setValue("multiPartImage", (event.target as HTMLInputElement).files);
      setImage(
         URL.createObjectURL((event.target as HTMLInputElement)?.files[0])
      );
   };

   async function send(company: CompanyModel) {
      try {
         const formData = new FormData();
         if (props.company) {
            formData.append("id", props.company.id.toString());
         }
         if (company.name) {
            formData.append("name", company.name);
         }
         formData.append("email", company.email);
         formData.append("password", company.password);
         if (company.multiPartImage) {
            formData.append("multiPartImage", company.multiPartImage[0]);
         }

         if (props.add) {
            const response = await JwtAxios.post<CompanyModel>(
               globals.urls.addCompany,
               formData
            );
            store.dispatch(CompanyAddedAction(response.data));
         } else {
            const response = await JwtAxios.put<CompanyModel>(
               globals.urls.updateCompany,
               formData
            );
            store.dispatch(CompanyUpdatedAction(response.data));
         }
         props.handleClose();
      } catch (err) {
         notify.error(err);
      }
   }
   return (
      <div className="CompanyForm">
         <div className={classes.root}>
            <Typography variant="h5">
               {props.add ? "Add Company" : "Update Company"}
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
               {props.add && (
                  <TextField
                     required
                     variant="outlined"
                     id="name"
                     fullWidth
                     placeholder={props.company?.name}
                     label="Name"
                     name="name"
                     autoFocus
                     inputProps={{
                        minLength: 3,
                        maxLength: 10,
                     }}
                     {...register("name")}
                  />
               )}

               <TextField
                  variant="outlined"
                  required={props.add && true}
                  fullWidth
                  placeholder={props.company?.email}
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  autoFocus
                  InputLabelProps={
                     !props.add
                        ? {
                             shrink: true,
                          }
                        : {}
                  }
                  {...register("email")}
               />

               <TextField
                  variant="outlined"
                  required={props.add && true}
                  fullWidth
                  placeholder={props.company?.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoFocus
                  inputProps={{
                     minLength: 3,
                     maxLength: 15,
                  }}
                  InputLabelProps={
                     !props.add
                        ? {
                             shrink: true,
                          }
                        : {}
                  }
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

export default CompanyForm;
