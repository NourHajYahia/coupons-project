import {
   Avatar,
   IconButton,
   makeStyles,
   Menu,
   MenuItem,
   Theme,
   Typography,
} from "@material-ui/core";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import globals from "../../../Services/Globals";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
   avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      color: theme.palette.primary.main,
      backgroundColor: "white",
   },
}));

function CustomerAuthMenu(props: { clientInfo: CustomerModel }): JSX.Element {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleMenuClose = () => {
      setAnchorEl(null);
   };
   return (
      <div className="CustomerAuthMenu">
         <div className={classes.root}>
            <Typography>
               Hello{" "}
               {props.clientInfo.lastName + " " + props.clientInfo.firstName}
            </Typography>
            <IconButton
               aria-label="account of current user"
               aria-controls="menu"
               aria-haspopup="true"
               onClick={handleProfileMenuOpen}
               color="inherit">
               <Avatar
                  className={classes.avatar}
                  src={globals.urls.getImage + props.clientInfo.image}
               />
            </IconButton>
            <Menu
               anchorEl={anchorEl}
               anchorOrigin={{ vertical: "top", horizontal: "right" }}
               id="menu"
               keepMounted
               transformOrigin={{ vertical: "top", horizontal: "right" }}
               open={Boolean(anchorEl)}
               onClose={handleMenuClose}>
               <NavLink to="/customer/myInfo">
                  <MenuItem>My Info</MenuItem>
               </NavLink>
               <NavLink to="/customer/myCoupons">
                  <MenuItem>My Coupons</MenuItem>
               </NavLink>
               <NavLink to="/logout">
                  <MenuItem>Logout </MenuItem>
               </NavLink>
            </Menu>
         </div>
      </div>
   );
}

export default CustomerAuthMenu;
