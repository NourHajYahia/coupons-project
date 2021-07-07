import {
   CardActionArea,
   CardContent,
   CardMedia,
   makeStyles,
   Theme,
   Typography,
} from "@material-ui/core";
import CompanyModel from "../../../../Models/CompanyModel";
import globals from "../../../../Services/Globals";

const useStyles = makeStyles((theme: Theme) => ({
   cardActionArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   media: {
      maxHeight: 250,
   },
   img: {
      width: "100%",
      height: 250,
   },

   cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
   },
}));

function CompanyCard(props: { company: CompanyModel }): JSX.Element {
   const classes = useStyles();
   return (
      <div className="CompanyCard">
         <CardActionArea className={classes.cardActionArea}>
            <div className={classes.img}>
               <CardMedia
                  component="img"
                  className={classes.media}
                  image={globals.urls.getImage + props.company.image}
                  title="Contemplative Reptile"
               />
            </div>
            <CardContent className={classes.cardContent}>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Id: {props.company.id}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Name: {props.company.name}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Email: {props.company.email}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Password: {props.company.password}
               </Typography>
            </CardContent>
         </CardActionArea>
      </div>
   );
}

export default CompanyCard;
