import { makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      top: 0,
      left: 0,
      background: theme.palette.background.paper,
   },
}));

function Page404(): JSX.Element {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <Typography variant="h3" color="textSecondary">
            404 | Page Not Found
         </Typography>
      </div>
   );
}

export default Page404;
