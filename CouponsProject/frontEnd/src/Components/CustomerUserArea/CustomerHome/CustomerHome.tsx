import {
   makeStyles,
   Paper,
   Theme,
   useMediaQuery,
   useTheme,
} from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { ClientType } from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notifications";
import CategoryList from "../../Shared/CategoriesList/CategoryList";
import CouponsSearchBar from "../../Shared/CouponsSearchBar/CouponsSearchBar";
import CustomerCouponsList from "../CustomerCouponsList/CustomerCouponsList";

const useStyles = makeStyles((theme: Theme) => ({
   customerBar: {
      top: 0,
      zIndex: 1,
      position: "sticky",
      [theme.breakpoints.up("lg")]: {
         position: "static",
      },
   },
   searchBar: {
      backgroundColor: theme.palette.background.paper,
   },
   category: {
      marginTop: theme.spacing(1),
   },
}));

function CustomerHome(): JSX.Element {
   const history = useHistory();
   const classes = useStyles();
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up("lg"));

   useEffect(() => {
      const clientType = store.getState().authState.client?.clientType;
      if (!clientType || clientType !== ClientType.Customer) {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [history]);

   return (
      <div className="CustomerHome">
         <div className={classes.customerBar}>
            <Paper className={classes.searchBar}>
               {!matches && <CouponsSearchBar />}
            </Paper>
            <div className={classes.category}>
               <CategoryList />
            </div>
         </div>
         <CustomerCouponsList />
      </div>
   );
}

export default CustomerHome;
