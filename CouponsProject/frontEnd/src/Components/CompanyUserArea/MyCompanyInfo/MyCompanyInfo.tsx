import {
   Box,
   Button,
   ButtonGroup,
   CardMedia,
   CssBaseline,
   makeStyles,
   Paper,
   Theme,
   Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ClientType } from "../../../Models/ClientType";
import CompanyModel from "../../../Models/CompanyModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& > *": {
         marginBottom: theme.spacing(5),
      },
   },
   box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      "& > *": {
         marginRight: theme.spacing(5),
      },
   },
   input: {
      display: "none",
   },
   img: { maxHeight: 1000, maxWidth: 1000 },

   groupButton: {},
}));

function MyCompanyInfo(): JSX.Element {
   const [company, setCompany] = useState<CompanyModel>();
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      if (
         store.getState().authState.client?.clientType === ClientType.Company
      ) {
         setCompany(
            store.getState().authState.client?.clientInfo as CompanyModel
         );
      } else {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [company, history]);

   const handleClickBack = () => {
      history.push("/company");
   };

   return (
      <div className="MyCompanyInfo">
         <Paper className={classes.root}>
            <CssBaseline />
            <Typography variant="h3" align="center">
               My Company Info
            </Typography>
            <Box>
               <CardMedia
                  className={classes.img}
                  component="img"
                  image={globals.urls.getImage + company?.image}
                  title="Contemplative Reptile"
               />
            </Box>
            <Box className={classes.box}>
               <Typography color="textPrimary" id="name" variant="h5">
                  Name:
               </Typography>
               <Typography color="textSecondary" id="name" variant="h5">
                  {company?.name}
               </Typography>
            </Box>
            <Box className={classes.box}>
               <Typography color="textPrimary" id="email" variant="h5">
                  Email:
               </Typography>
               <Typography color="textSecondary" id="email" variant="h5">
                  {company?.email}
               </Typography>
            </Box>
            <ButtonGroup
               size="large"
               variant="contained"
               className={classes.groupButton}
               color="primary"
               aria-label="contained primary button group">
               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleClickBack}>
                  Back
               </Button>
            </ButtonGroup>
         </Paper>
      </div>
   );
}

export default MyCompanyInfo;
