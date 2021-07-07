import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import categoriesImages from "../../../Services/CategoriesImages";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { Category } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import JwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notifications";
import { useEffect, useState } from "react";
import CategoriesImages from "../../../Services/CategoriesImages";
import { setCategoryAction } from "../../../Redux/CategoryViewState";
import { ClientType } from "../../../Models/ClientType";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         width: "100%",
         background: theme.palette.background.paper,
         boxShadow: theme.shadows[2],
      },
      container: {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         padding: theme.spacing(2),
         "& > *": {
            marginRight: theme.spacing(2),
         },
      },
      avatarActive: {
         height: 90,
         width: 90,
         border: "solid",
         borderColor: theme.palette.secondary.main,
      },
      avatar: {
         height: 90,
         width: 90,
      },
   })
);

export default function CategoryList() {
   const classes = useStyles();
   const [categorySelected, setCategorySelected] = useState<Category>(null);
   const [images, setImages] = useState(CategoriesImages.images);
   const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

   useEffect(() => {
      const unsubscribeMe = store.subscribe(() => {
         setCategoryOpen(store.getState().categoryViewState.viewOpen);
         setCategorySelected(store.getState().categoryViewState.category);
      });
      return () => {
         unsubscribeMe();
      };
   });

   useEffect(() => {
      let isCanceled = false;
      if (
         store.getState().authState.client?.clientType === ClientType.Company
      ) {
         const fetchCompanyCategoryCoupons = async () => {
            try {
               const response = await JwtAxios.get<Category[]>(
                  globals.urls.getCompanyCategories
               );
               const images = CategoriesImages.images.filter((image) => {
                  if (
                     response.data.find(
                        (category) => category === image.category
                     )
                  ) {
                     return image;
                  }
                  return null;
               });
               images.splice(0, 0, categoriesImages.images[0]);
               if (!isCanceled) {
                  setImages(images);
               }
            } catch (err) {
               notify.error(err);
            }
         };
         const unsubscribeMe = store.subscribe(() => {
            fetchCompanyCategoryCoupons();
         });
         return () => {
            unsubscribeMe();
            isCanceled = true;
         };
      }
   }, [categoryOpen]);

   const handleSelect = (categorySelected: Category) => {
      setCategorySelected(categorySelected);
      store.dispatch(setCategoryAction(categorySelected));
   };

   return (
      <div className="CategoryList">
         <div className={classes.root}>
            <Collapse in={categoryOpen}>
               <Grid container justify="center">
                  {images.map((tile) => (
                     <Grid key={tile.name} item>
                        <div className={classes.container}>
                           <Avatar
                              className={
                                 categorySelected === tile.category
                                    ? classes.avatarActive
                                    : classes.avatar
                              }
                              alt={tile.name}
                              src={tile.image}
                           />
                           <Button
                              onClick={() => {
                                 handleSelect(tile.category as Category);
                              }}>
                              <Typography variant="button">
                                 {tile.name}
                              </Typography>
                           </Button>
                        </div>
                     </Grid>
                  ))}
               </Grid>
            </Collapse>
         </div>
      </div>
   );
}
