import {
   CardActionArea,
   CardContent,
   CardMedia,
   makeStyles,
   Theme,
   Typography,
} from "@material-ui/core";
import CustomerModel from "../../../../Models/CustomerModel";
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

function CustomerCard(props: { customer: CustomerModel }): JSX.Element {
   const classes = useStyles();
   return (
      <div className="CustomerCard">
         <CardActionArea className={classes.cardActionArea}>
            <div className={classes.img}>
               <CardMedia
                  component="img"
                  className={classes.media}
                  image={globals.urls.getImage + props.customer.image}
                  title="Contemplative Reptile"
               />
            </div>
            <CardContent className={classes.cardContent}>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Id: {props.customer.id}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  First Name: {props.customer.firstName}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Last Name: {props.customer.lastName}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Email: {props.customer.email}
               </Typography>
               <Typography gutterBottom variant="body1" color="textPrimary">
                  Password: {props.customer.password}
               </Typography>
            </CardContent>
         </CardActionArea>
      </div>
   );
}

export default CustomerCard;
