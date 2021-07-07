import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
}));

function AdminAuthMenu(props: { clientInfo: string }): JSX.Element {
   const classes = useStyles();
   return (
      <div className="AdminAuthMenu">
         <div className={classes.root}>
            <Typography>Hello {props.clientInfo}</Typography>
            <Button color="inherit">
               <NavLink to="/logout">logout</NavLink>
            </Button>
         </div>
      </div>
   );
}

export default AdminAuthMenu;
