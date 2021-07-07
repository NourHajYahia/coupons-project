import { makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import store from "../../../Redux/Store";
import GuestCategorySlider from "../GuestCategoryImgSlider/GuestCategorySlider";
import Top10SalesCouponsList from "../Top10SalesCouponsList/Top10SalesCouponsList";

const useStyles = makeStyles((theme: Theme) => ({
   top10: {
      display: "flex",
      position: "relative",
      zIndex: 5,
      width: "80%",
      margin: "auto",
      boxShadow: theme.shadows[2],
   },
}));

function GuestHome(): JSX.Element {
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      if (store.getState().authState.client) {
         history.push("/");
      }
   }, [history]);

   return (
      <div className="GuestHome">
         <GuestCategorySlider />
         <div className={classes.top10}>
            <Top10SalesCouponsList />
         </div>
      </div>
   );
}

export default GuestHome;
