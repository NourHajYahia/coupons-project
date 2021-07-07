import {
   AppBar,
   Box,
   Grid,
   IconButton,
   makeStyles,
   Theme,
   Toolbar,
   Typography,
   useMediaQuery,
   useTheme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ClientType } from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import Auth from "../../AuthArea/Auth/Auth";
import CouponsSearchBar from "../../Shared/CouponsSearchBar/CouponsSearchBar";
import Logo from "../Logo/Logo";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { darkModeToggle } from "../../../Redux/DarkModeState";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      width: "100%",
      "& > * ": {
         padding: theme.spacing(1),
      },
   },
   header: {
      margin: 0,
   },
   auth: {
      marginLeft: theme.spacing(1),
   },
   title: {
      flexGrow: 1,
      "& :first-child ": {
         margin: 2,
      },
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
   },
   appBar: {
      background:
         theme.palette.type === "dark"
            ? theme.palette.primary.main
            : theme.palette.primary.main,
   },
   searchBar: {
      marginLeft: theme.spacing(5),
   },
}));

function Header(): JSX.Element {
   const classes = useStyles();
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up("lg"));
   const [clientType, setClientType] = useState<ClientType>(
      store.getState().authState.client?.clientType
   );

   useEffect(() => {
      const unSubscribeMe = store.subscribe(() => {
         setClientType(store.getState().authState.client?.clientType);
      });
      return () => {
         unSubscribeMe();
      };
   });

   return (
      <div className={classes.header}>
         <AppBar position="static" className={classes.appBar}>
            <Grid container direction="row">
               <Grid item xl={2} />
               <Grid container item xl={8} direction="row">
                  <Toolbar className={classes.root}>
                     <Box className={classes.title}>
                        <NavLink to="/">
                           <Typography
                              variant="subtitle2"
                              style={{ margin: 0 }}
                              noWrap>
                              Coupon
                           </Typography>
                           <Logo />
                        </NavLink>
                        <div className={classes.searchBar}>
                           {clientType === ClientType.Customer && matches && (
                              <CouponsSearchBar />
                           )}
                        </div>
                     </Box>
                     <Box className={classes.auth}>
                        <Auth />
                     </Box>
                     <IconButton
                        onClick={() => {
                           store.dispatch(darkModeToggle());
                        }}>
                        <Brightness4Icon />
                     </IconButton>
                  </Toolbar>
               </Grid>
               <Grid item xl={2} />
            </Grid>
         </AppBar>
      </div>
   );
}

export default Header;
