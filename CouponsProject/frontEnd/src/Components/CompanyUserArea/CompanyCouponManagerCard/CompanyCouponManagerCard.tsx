import { CouponModel } from "../../../Models/CouponModel";
import { Card, ClickAwayListener, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import globals from "../../../Services/Globals";
import JwtAxios from "../../../Services/JwtAxios";
import store from "../../../Redux/Store";
import { CouponDeletedAction } from "../../../Redux/CouponsState";
import notify from "../../../Services/Notifications";
import CouponCard from "../../Shared/CouponCard/CouponCard";
import CouponActionsBar from "../../Shared/CouponActionsBar/CouponActionsBar";
import CouponForm from "../CouponForm/CouponForm";

const useStyles = makeStyles((theme: Theme) => ({
   displayCard: {
      boxSizing: "border-box",
      boxShadow: theme.shadows[5],
      margin: "0 auto",
   },
   formCard: {
      width: 345,
      maxHeight: 800,
      overflow: "auto",
      margin: "0 auto",
   },
}));

function CompanyCouponManagerCard(props: { coupon: CouponModel }): JSX.Element {
   const classes = useStyles();
   const [updateOn, setUpdateOn] = useState<boolean>(false);

   const openUpdate = () => {
      setUpdateOn(true);
   };
   const closeUpdate = () => {
      setUpdateOn(false);
   };

   async function deleteCoupon() {
      try {
         const couponId = Number(props.coupon.id);
         const response = await JwtAxios.delete<string>(
            globals.urls.deleteCoupon + "?couponId=" + couponId
         );
         store.dispatch(CouponDeletedAction(props.coupon.id));
         notify.success(response.data);
      } catch (err) {
         notify.error(err);
      }
   }

   return (
      <ClickAwayListener onClickAway={closeUpdate}>
         <div className="CompanyCouponManager">
            {updateOn ? (
               <Card className={classes.formCard}>
                  <CouponForm coupon={props.coupon} handleClose={closeUpdate} />
               </Card>
            ) : (
               <Card className={classes.displayCard}>
                  <CouponCard coupon={props.coupon} />
                  <div>
                     <CouponActionsBar
                        onDelete={deleteCoupon}
                        onUpdate={openUpdate}
                        infoPath={"/coupons/" + props.coupon.id}
                     />
                  </div>
               </Card>
            )}
         </div>
      </ClickAwayListener>
   );
}

export default CompanyCouponManagerCard;
