import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { CouponsDownloadedAction } from "../../../Redux/CouponsState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import JwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notifications";
import CompanyCouponManagerCard from "../CompanyCouponManagerCard/CompanyCouponManagerCard";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: "0 auto",
   },
   cardManager: {
      margin: theme.spacing(1),
   },
}));

function CompanyCouponsList(): JSX.Element {
   const classes = useStyles();
   const [coupons, setCoupons] = useState<CouponModel[]>([]);

   useEffect(() => {
      if (store.getState().couponState.coupons === null) {
         fetchAllCompanyCoupons();
      }
   }, []);

   useEffect(() => {
      const unsubscribeMe = store.subscribe(() => {
         setCoupons([...store.getState().couponState.coupons]);
      });
      return () => {
         unsubscribeMe();
      };
   });

   const fetchAllCompanyCoupons = async () => {
      try {
         const response = await JwtAxios.get<CouponModel[]>(
            globals.urls.getAllCompanyCoupons
         );
         setCoupons(response.data);
         store.dispatch(CouponsDownloadedAction(response.data));
      } catch (err) {
         notify.error(err);
      }
   };

   return (
      <div className="CompanyCouponsList">
         <div className={classes.root}>
            <Grid container justify="center">
               {coupons?.map((coupon) => (
                  <Grid className={classes.cardManager} key={coupon.id} item>
                     <CompanyCouponManagerCard coupon={coupon} />
                  </Grid>
               ))}
            </Grid>
         </div>
      </div>
   );
}

export default CompanyCouponsList;
