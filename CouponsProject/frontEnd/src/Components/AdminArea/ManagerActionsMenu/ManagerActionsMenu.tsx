import { Button, CardActions, makeStyles, Theme } from "@material-ui/core";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => ({
   cardActions: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
   },
}));

function ManagerActionsMenu(props: {
   onUpdate: any;
   onDelete: any;
   infoPath: string;
}): JSX.Element {
   const classes = useStyles();
   return (
      <div className="ManagerActionMenu">
         <CardActions className={classes.cardActions}>
            <NavLink to={props.infoPath}>
               <Button size="small" color="primary">
                  Info
               </Button>
            </NavLink>
            <Button size="small" color="primary" onClick={props.onUpdate}>
               Update
            </Button>
            <Button size="small" color="secondary" onClick={props.onDelete}>
               Delete
            </Button>
         </CardActions>
      </div>
   );
}

export default ManagerActionsMenu;
