import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import Layout from "./Components/LayoutArea/Layout/Layout";
import store from "./Redux/Store";

function App(): JSX.Element {
   const [darkModeOn, setDarkModeOn] = useState<boolean>(false);
   const myTheme = createMuiTheme({
      palette: {
         primary: {
            main: "#6D435A",
            light: "#76596C",
         },
         secondary: {
            main: "#FF6978",
            light: "#FFC2C8",
         },
         background: {
            paper: "#FFFFFF",
            default: "#E9EBED",
         },
      },
   });

   const darkTheme = createMuiTheme({
      palette: {
         type: "dark",
         primary: {
            light: "#FFE548",
            main: "#FFCC2C",
         },
         secondary: {
            main: "#FF4B3E",
         },
      },
   });

   useEffect(() => {
      setDarkModeOn(store.getState().darkModeState.darkModeOn);
      const unSubscribeMe = store.subscribe(() => {
         setDarkModeOn(store.getState().darkModeState.darkModeOn);
      });
      return () => {
         unSubscribeMe();
      };
   }, [darkModeOn]);

   return (
      <ThemeProvider theme={darkModeOn ? darkTheme : myTheme}>
         <div>
            <Layout />
         </div>
      </ThemeProvider>
   );
}

export default App;
