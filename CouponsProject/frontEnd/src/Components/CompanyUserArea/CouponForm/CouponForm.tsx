import {
   Avatar,
   Button,
   CardMedia,
   FormControl,
   InputLabel,
   makeStyles,
   Select,
   TextField,
   Theme,
   Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Category, CouponModel } from "../../../Models/CouponModel";
import {
   CouponAddedAction,
   CouponUpdatedAction,
} from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import JwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notifications";

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

function CouponForm(props: {
   add?: boolean;
   coupon?: CouponModel;
   handleClose: Function;
}): JSX.Element {
   const classes = useStyles();
   const history = useHistory();
   const { register, handleSubmit, setValue } = useForm<CouponModel>();
   const [category, setCategory] = useState<string>("");
   const [img, setImage] = useState(
      props.add ? null : globals.urls.getImage + props.coupon.image
   );
   const [nowDate] = useState(() => {
      const now = new Date();
      const nowDay = new Date(now.setSeconds(0));
      return nowDay.toISOString().split(".")[0];
   });
   const [plusDay] = useState(() => {
      const now = new Date();
      now.setSeconds(0);
      const nowPlusDay = new Date(now.setHours(now.getHours() + 24));
      return nowPlusDay.toISOString().split(".")[0];
   });

   const handleChangeImage = (event: SyntheticEvent) => {
      setValue("multiPartImage", (event.target as HTMLInputElement).files);
      setImage(
         URL.createObjectURL((event.target as HTMLInputElement)?.files[0])
      );
   };

   const handleCategoryChange = (event: React.ChangeEvent<{ value: any }>) => {
      let category = event.target.value as Category;
      setCategory(category);
      setValue("category", category);
   };

   async function send(coupon: CouponModel) {
      try {
         const couponFormData = new FormData();
         if (!props.add) {
            couponFormData.append("id", props.coupon.id?.toString() || "");
         }
         couponFormData.append("title", coupon.title);
         couponFormData.append("description", coupon.description);
         couponFormData.append("startDate", coupon.startDate?.toString() || "");
         couponFormData.append("endDate", coupon.endDate?.toString() || "");
         couponFormData.append("amount", coupon.amount?.toString() || "");
         couponFormData.append("price", coupon.price?.toString() || "");
         couponFormData.append("category", coupon.category?.toString() || "");
         if (coupon.multiPartImage) {
            couponFormData.append("multiPartImage", coupon.multiPartImage[0]);
         }
         if (props.add) {
            const response = await JwtAxios.post<CouponModel>(
               globals.urls.addCoupon,
               couponFormData
            );
            store.dispatch(CouponAddedAction(response.data));
         } else {
            const response = await JwtAxios.put<CouponModel>(
               globals.urls.updateCoupon,
               couponFormData
            );
            store.dispatch(CouponUpdatedAction(response.data));
         }
         props.handleClose();
         history.push("/company");
      } catch (err) {
         notify.error(err);
      }
   }

   return (
      <div className="CouponForm">
         <div className={classes.root}>
            <Typography component="h1" variant="h5">
               {props.add ? "Add Coupon" : "Update Coupon"}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(send)}>
               {img && (
                  <CardMedia
                     component="img"
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
                  variant="outlined"
                  id="title"
                  fullWidth
                  required={props.add ? true : false}
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  defaultValue={props.coupon?.title}
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  {...register("title")}
                  inputProps={{
                     minLength: 3,
                     maxLength: 20,
                  }}
               />
               <TextField
                  variant="outlined"
                  id="description"
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  required={props.add ? true : false}
                  autoComplete="description"
                  autoFocus
                  defaultValue={props.coupon?.description}
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  inputProps={{
                     maxLength: 255,
                  }}
                  {...register("description")}
               />
               <TextField
                  variant="outlined"
                  fullWidth
                  name="startDate"
                  label="Start Date"
                  type="datetime-local"
                  required={props.add ? true : false}
                  defaultValue={!props.add && props.coupon?.startDate}
                  inputProps={{
                     min: nowDate,
                  }}
                  InputLabelProps={{
                     shrink: true,
                  }}
                  {...register("startDate")}
               />
               <TextField
                  variant="outlined"
                  fullWidth
                  name="endDate"
                  label="End Date"
                  type="datetime-local"
                  required={props.add ? true : false}
                  defaultValue={!props.add && props.coupon?.endDate}
                  inputProps={{
                     min: plusDay,
                  }}
                  InputLabelProps={{
                     shrink: true,
                  }}
                  {...register("endDate")}
               />
               <TextField
                  variant="outlined"
                  fullWidth
                  name="amount"
                  label="Amount"
                  required={props.add ? true : false}
                  type="number"
                  defaultValue={props.coupon?.amount}
                  inputProps={{
                     min: 0,
                  }}
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  {...register("amount")}
               />
               <TextField
                  variant="outlined"
                  fullWidth
                  name="price"
                  label="Price"
                  required={props.add ? true : false}
                  defaultValue={props.coupon?.price}
                  inputProps={{
                     min: 0,
                  }}
                  InputLabelProps={
                     props.add
                        ? {}
                        : {
                             shrink: true,
                          }
                  }
                  type="number"
                  {...register("price")}
               />

               <FormControl variant="outlined" fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                     native
                     onChange={handleCategoryChange}
                     value={category}
                     id="category"
                     label="Category"
                     required={props.add ? true : false}>
                     <option aria-label="None" value="" />
                     {Object.entries(Category).map((obj) => (
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
                  submit
               </Button>
            </form>
         </div>
      </div>
   );
}

export default CouponForm;
