import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CouponModel } from "../../../Models/CouponModel";
import { setCategoryAction, toggleViewAction } from "../../../Redux/CategoryViewState";
import { CouponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import JwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notifications";
import CustomerCouponManagerCard from "../CustomerCouponManagerCard/CustomerCouponManagerCard";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: "0 auto",
   },
   cardManager: {
      margin: theme.spacing(1),
   },
}));

function CustomerCouponsList(): JSX.Element {
   const classes = useStyles();
   const location = useLocation();
   const [coupons, setCoupons] = useState<CouponModel[]>([]);

   useEffect(() => {
      const unsubscribeMe = store.subscribe(() => {
         setCoupons(store.getState().couponState.coupons);
      });
      return () => {
         unsubscribeMe();
      };
   });

   useEffect(() => {
      store.dispatch(toggleViewAction(false));
      store.dispatch(setCategoryAction(null));
      const fetchAllCustomerCoupons = async () => {
         let response: any;
         try {
            if (location.pathname === "/customer") {
               response = await JwtAxios.get<CouponModel[]>(
                  globals.urls.getAllCustomerNotCoupons
               );
            }
            if (location.pathname === "/customer/myCoupons") {
               response = await JwtAxios.get<CouponModel[]>(
                  globals.urls.getAllCustomerCoupons
               );
            }
            store.dispatch(CouponsDownloadedAction(response.data));
         } catch (err) {
            notify.error(err);
         }
      };
      fetchAllCustomerCoupons();
   }, [location]);

   return (
      <div className="CustomerCouponsList">
         <div className={classes.root}>
            <Grid container justify="center">
               {coupons?.map((coupon) => (
                  <Grid className={classes.cardManager} key={coupon.id} item>
                     <CustomerCouponManagerCard coupon={coupon} />
                  </Grid>
               ))}
            </Grid>
         </div>
      </div>
   );
}

export default CustomerCouponsList;
