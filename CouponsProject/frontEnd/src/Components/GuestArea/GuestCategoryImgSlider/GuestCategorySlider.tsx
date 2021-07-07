import { ButtonBase, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Category } from "../../../Models/CouponModel";
import { setCategoryAction } from "../../../Redux/CategoryViewState";
import store from "../../../Redux/Store";
import LandingImages from "../../../Services/LandingImages";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      width: "100%",
      height: 450,
   },
   image: {
      position: "absolute",
      left: 0,
      height: 700,
      width: "100%",
      "&:hover, &$focusVisible": {
         zIndex: 1,
         "& $imageBackdrop": {
            opacity: 0.15,
         },
         "& $imageMarked": {
            opacity: 0,
         },
         "& $imageTitle": {
            border: "4px solid currentColor",
         },
      },
   },
   focusVisible: {},
   imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white,
   },
   imageSrc: {
      width: "100%",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
   },
   imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity"),
   },
   imageTitle: {
      position: "relative",
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
         theme.spacing(1) + 6
      }px`,
   },
   imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity"),
   },
}));

function GuestCategorySlider(): JSX.Element {
   const classes = useStyles();
   const [imageIndex, setImageIndex] = useState<number>(0);

   useEffect(() => {
      const timerId = window.setInterval(() => {
         nextImageIndex();
      }, 6000);

      return () => {
         window.clearInterval(timerId);
      };
   }, []);

   const nextImageIndex = () => {
      setImageIndex((prev) => {
         if (prev === LandingImages.images.length - 1) {
            return 0;
         }
         return prev + 1;
      });
   };

   const handleCategorySelect = () => {
      store.dispatch(
         setCategoryAction(
            LandingImages.images[imageIndex].category as Category
         )
      );
   };

   return (
      <div className="GuestCategorySlider">
         <div className={classes.root}>
            <ButtonBase
               focusRipple
               className={classes.image}
               focusVisibleClassName={classes.focusVisible}
               onClick={handleCategorySelect}>
               <span
                  className={classes.imageSrc}
                  style={{
                     backgroundImage: `url(${LandingImages.images[imageIndex].image})`,
                  }}
               />
               <span className={classes.imageBackdrop} />
               <span className={classes.imageButton}>
                  <Typography
                     component="span"
                     variant="subtitle1"
                     color="inherit"
                     className={classes.imageTitle}>
                     {LandingImages.images[imageIndex].name}
                     <span className={classes.imageMarked} />
                  </Typography>
               </span>
            </ButtonBase>
         </div>
      </div>
   );
}

export default GuestCategorySlider;
