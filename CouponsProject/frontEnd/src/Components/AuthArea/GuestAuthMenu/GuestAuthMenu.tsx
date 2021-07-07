import {
   IconButton,
   makeStyles,
   Modal,
   Theme,
   Typography,
} from "@material-ui/core";
import { useState } from "react";
import Login from "../Login/Login";

function getModalStyle() {
   const top = 50;
   const left = 50;

   return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
   };
}

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
   },
   login: {
      boxSizing: "border-box",
      position: "absolute",
      width: 300,
      height: 500,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "2px",
      boxShadow: theme.shadows[10],
      padding: theme.spacing(1, 0, 1),
   },
}));

function GuestAuthMenu(): JSX.Element {
   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);
   const [loginOpen, setLoginOpen] = useState<boolean>(false);

   const handleLoginOpen = () => {
      setLoginOpen(true);
   };

   const handleLoginClose = () => {
      setLoginOpen(false);
   };

   return (
      <div className="GuestAuthMenu">
         <div className={classes.root}>
            <Typography>Hello Guest</Typography>
            <IconButton onClick={handleLoginOpen} color="inherit">
               <Typography>Login</Typography>
            </IconButton>
            <Modal
               open={loginOpen}
               onClose={handleLoginClose}
               aria-labelledby="modal-login">
               <div
                  id="modal-login"
                  className={classes.login}
                  style={modalStyle}>
                  <Login />
               </div>
            </Modal>
         </div>
      </div>
   );
}

export default GuestAuthMenu;
