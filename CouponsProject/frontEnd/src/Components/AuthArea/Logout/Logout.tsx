import { useEffect } from "react";
import { useHistory } from "react-router";
import { logoutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notifications";

function Logout(): JSX.Element {
   const history = useHistory();
   useEffect(() => {
      store.dispatch(logoutAction());
      notify.success("You are logged out");
      history.push("/");
   });
   return null;
}

export default Logout;
