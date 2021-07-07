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
import { useHistory, useParams } from "react-router";
import { ClientType } from "../../../../Models/ClientType";
import CompanyModel from "../../../../Models/CompanyModel";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import JwtAxios from "../../../../Services/JwtAxios";
import notify from "../../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: theme.spacing(2),
      background: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
         marginBottom: theme.spacing(5),
      },
   },
   box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      marginBottom: theme.spacing(2),
      width: "100%",
      "& > *": {
         marginRight: theme.spacing(5),
      },
   },
   input: {
      display: "none",
   },
   img: { maxHeight: 800, maxWidth: 800 },
}));

function CompanyInfo(): JSX.Element {
   const { id }: { id: string } = useParams();
   const [company, setCompany] = useState<CompanyModel>(
      store
         .getState()
         .companiesState.companies.find((company) => company.id === +id)
   );
   const classes = useStyles();
   const history = useHistory();

   useEffect(() => {
      if (
         store.getState().authState.client?.clientType !==
         ClientType.Administrator
      ) {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [history]);

   useEffect(() => {
      const fetchCompany = async () => {
         try {
            const response = await JwtAxios.get<CompanyModel>(
               globals.urls.getCompany,
               {
                  params: {
                     companyId: +id,
                  },
               }
            );

            setCompany(response.data);
         } catch (err) {
            history.push("/pageNotFound");
         }
      };
      if (!company) {
         fetchCompany();
      }
   }, [company, history, id]);

   const handleClickBack = () => {
      history.push("/admin/companies");
   };

   return (
      <div className="CompanyInfo">
         <CssBaseline />
         <Paper className={classes.root}>
            <Typography component="h1" variant="h1" align="center">
               Company Info
            </Typography>

            <Box>
               <CardMedia
                  className={classes.img}
                  component="img"
                  src={globals.urls.getImage + company?.image}
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
            <Box className={classes.box}>
               <Typography color="textPrimary" id="password" variant="h5">
                  Password:
               </Typography>
               <Typography color="textSecondary" id="password" variant="h5">
                  {company?.password}
               </Typography>
            </Box>
            <ButtonGroup size="large" variant="contained" color="primary">
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

export default CompanyInfo;
