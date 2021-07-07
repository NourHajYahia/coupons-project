import {
   Avatar,
   CardContent,
   CardHeader,
   CardMedia,
   makeStyles,
   Theme,
   Typography,
} from "@material-ui/core";
import moment from "moment";
import { CouponModel } from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      maxWidth: 345,
      padding: 0,
   },
   header: {},
   media: {
      height: 200,
   },
   img: {},
   cardContent: {
      overflowY: "auto",
      height: 100,
   },
   cardContentSub: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
         margin: theme.spacing(3),
      },
   },
   avatar: {
      marginRight: theme.spacing(1),
      width: theme.spacing(7),
      height: theme.spacing(7),
   },
}));

function CouponCard(props: { coupon: CouponModel }): JSX.Element {
   const classes = useStyles();
   return (
      <div className="CouponCard">
         <div className={classes.root}>
            <CardHeader
               className={classes.header}
               avatar={
                  <Avatar
                     aria-label="recipe"
                     className={classes.avatar}
                     src={globals.urls.getImage + props.coupon.company?.image}
                  />
               }
               title={
                  <Typography variant="overline" color="textPrimary">
                     {props.coupon.title}
                  </Typography>
               }
               subheader={
                  <Typography variant="subtitle2" color="textSecondary">
                     {"Iss: " +
                        moment(props.coupon.startDate).format(
                           "YYYY-MM-DD hh:mm"
                        )}
                     <br />
                     {"Exp: " +
                        moment(props.coupon.endDate).format("YYYY-MM-DD hh:mm")}
                  </Typography>
               }
            />
            <div className={classes.img}>
               <CardMedia
                  component="img"
                  className={classes.media}
                  image={globals.urls.getImage + props.coupon.image}
                  title="Contemplative Reptile"
               />
            </div>
            <CardContent className={classes.cardContentSub}>
               <div>
                  <Typography variant="subtitle2" color="textSecondary">
                     Category
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                     {props.coupon.category}
                  </Typography>
               </div>
               <div>
                  <Typography variant="subtitle2" color="textSecondary">
                     Price
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                     {props.coupon.price} $
                  </Typography>
               </div>
               <div>
                  <Typography variant="subtitle2" color="textSecondary">
                     Amount
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                     {props.coupon.amount}
                  </Typography>
               </div>
            </CardContent>
            <CardContent className={classes.cardContent}>
               <Typography variant="body2" color="textPrimary">
                  {props.coupon.description}
               </Typography>
            </CardContent>
         </div>
      </div>
   );
}

export default CouponCard;
