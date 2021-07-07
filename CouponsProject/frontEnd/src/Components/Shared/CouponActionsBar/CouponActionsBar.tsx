import { Button, CardActions, makeStyles, Theme } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
   cardActions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
}));

function CouponActionsBar(props: {
   onUpdate?: any;
   onDelete?: any;
   onPurchase?: any;
   infoPath?: string;
}): JSX.Element {
   const classes = useStyles();
   return (
      <div className="CouponActionsBar">
         <CardActions className={classes.cardActions}>
            {props.infoPath && (
               <NavLink to={props.infoPath}>
                  <Button size="small" color="primary">
                     Info
                  </Button>
               </NavLink>
            )}
            {props.onUpdate && (
               <Button size="small" color="primary" onClick={props.onUpdate}>
                  Update
               </Button>
            )}
            {props.onDelete && (
               <Button size="small" color="secondary" onClick={props.onDelete}>
                  Delete
               </Button>
            )}
            {props.onPurchase && (
               <Button
                  size="small"
                  color="secondary"
                  onClick={props.onPurchase}>
                  Purchase
               </Button>
            )}
         </CardActions>
      </div>
   );
}

export default CouponActionsBar;
