import {
   Button,
   ButtonGroup,
   CardMedia,
   makeStyles,
   Theme,
   Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ClientType } from "../../../Models/ClientType";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
   box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      "& > *": {
         marginRight: theme.spacing(5),
      },
   },

   img: { maxHeight: 1000, maxWidth: 1000 },

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
   groupButton: {},
}));

function CouponInfo(): JSX.Element {
   const { id }: { id: string } = useParams();
   const [coupon, setCoupon] = useState<CouponModel>();
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      if (
         store.getState().authState.client?.clientType === ClientType.Company ||
         store.getState().authState.client?.clientType === ClientType.Customer
      ) {
         const coupon = store
            .getState()
            .couponState.coupons?.find((coupon) => coupon.id === +id);
         if (coupon) {
            setCoupon(coupon);
         } else {
            history.push("/Page404");
         }
      } else {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [history, id]);

   const handleClickBack = () => {
      history.goBack();
   };

   return (
      <div className="CouponInfo">
         <div className={classes.root}>
            <Typography variant="h3" align="center">
               Company Info
            </Typography>

            <CardMedia
               className={classes.img}
               component="img"
               image={globals.urls.getImage + coupon?.image}
               title="Contemplative Reptile"
            />

            <Typography color="textPrimary" id="startDate" variant="h6">
               Start Date:
            </Typography>
            <Typography color="textSecondary" id="startDate" variant="h6">
               {coupon?.startDate}
            </Typography>
            <Typography color="textPrimary" id="endDate" variant="h6">
               End Date:
            </Typography>
            <Typography color="textSecondary" id="endDate" variant="h6">
               {coupon?.endDate}
            </Typography>

            <Typography color="textPrimary" id="category" variant="h6">
               Category:
            </Typography>
            <Typography color="textSecondary" id="category" variant="h6">
               {coupon?.category}
            </Typography>
            <Typography color="textPrimary" id="price" variant="h6">
               Price:
            </Typography>
            <Typography color="textSecondary" id="price" variant="h6">
               {coupon?.price} $
            </Typography>

            <Typography color="textPrimary" id="amount" variant="h6">
               Amount:
            </Typography>
            <Typography color="textSecondary" id="amount" variant="h6">
               {coupon?.amount}
            </Typography>

            <Typography color="textPrimary" id="amount" variant="h6">
               Description:
            </Typography>
            <Typography
               color="textSecondary"
               id="description"
               variant="h6"
               align="center">
               {coupon?.description}
            </Typography>

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
         </div>
      </div>
   );
}

export default CouponInfo;
