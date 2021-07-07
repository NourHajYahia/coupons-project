import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
   footer: {
      boxSizing: "border-box",
      marginTop: theme.spacing(2),
      background:
         theme.palette.type === "dark"
            ? theme.palette.primary.light
            : theme.palette.primary.light,
      height: 300,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
}));

function Footer(): JSX.Element {
   const classes = useStyles();
   return (
      <div className={classes.footer}>
         <div className="container">
            <h3 className="copyright">Nour Haj Yahia Production © 2021</h3>
         </div>
      </div>
   );
}

export default Footer;
