import { Card, makeStyles, Theme } from "@material-ui/core";
import { useLocation } from "react-router";
import { CouponModel } from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import JwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notifications";
import CouponActionsBar from "../../Shared/CouponActionsBar/CouponActionsBar";
import CouponCard from "../../Shared/CouponCard/CouponCard";



const useStyles = makeStyles((theme: Theme) => ({
  displayCard: {
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    margin: "0 auto",
  },
  purchase: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "2px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    width: 350,
    maxHeight: 800,
    overflow: "auto",
    margin: "0 auto",
  },
}));

function CustomerCouponManagerCard(props: {
  coupon: CouponModel;
}): JSX.Element {
  const classes = useStyles();
  const location = useLocation();



  async function PurchaseCoupon() {
    try {
      const couponId = Number(props.coupon.id);
      await JwtAxios.post<string>(
        globals.urls.purchaseCoupon + "/" + couponId
      );
      notify.success("Item Purchased");
    } catch (err) {
      notify.error(err);
    }
  }

  return (
    <div className="CustomerCouponsManagerCard">
      <Card className={classes.displayCard}>
        <CouponCard coupon={props.coupon} />
        <div>
          <CouponActionsBar
            infoPath={"/coupons/" + props.coupon.id}
            onPurchase={location.pathname === "/customer" && PurchaseCoupon}
          />
        </div>
      </Card>
    </div>
  );
}

export default CustomerCouponManagerCard;
