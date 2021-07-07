import { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import { Divider, Typography, withWidth, WithWidth } from "@material-ui/core";
import axios from "axios";
import { Category, CouponModel } from "../../../Models/CouponModel";
import notify from "../../../Services/Notifications";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: "flex",
         flexWrap: "wrap",
         justifyContent: "space-around",
         overflow: "hidden",
         backgroundColor: theme.palette.background.paper,
         padding: theme.spacing(1),
      },
      gridList: {
         width: "100%",
      },
      titleBar: {
         height: "20%",
      },
      subheader: {
         marginTop: theme.spacing(3),
         marginBottom: theme.spacing(3),
      },
      icon: {
         color: "rgba(255, 255, 255, 0.54)",
      },
   })
);

function Top10SalesCouponsList(props: WithWidth) {
   const classes = useStyles();
   const [top10Coupons, setTop10Coupons] = useState<CouponModel[]>(null);
   const [categorySelected, setCategorySelected] = useState<Category>(null);
   const switchBrakePoints = ["xs", "sm"];

   useEffect(() => {
      let isCanceled = false;
      const fetchTop10Coupons = async () => {
         const response = await axios.get<CouponModel[]>(
            globals.urls.getTop10Coupons,
            {
               params: {
                  category: categorySelected,
               },
            }
         );
         if (!isCanceled) {
            setTop10Coupons(response.data);
         }
      };
      fetchTop10Coupons();
      return () => {
         isCanceled = true;
      };
   }, [categorySelected]);

   useEffect(() => {
      const unSubscribeMe = store.subscribe(() => {
         setCategorySelected(store.getState().categoryViewState.category);
      });
      return () => {
         unSubscribeMe();
      };
   });

   return (
      <div className="Top10SalesCouponsList">
         <div className={classes.root}>
            <GridList
               cellHeight={switchBrakePoints.includes(props.width) ? 200 : 300}
               className={classes.gridList}
               cols={switchBrakePoints.includes(props.width) ? 1 : 2}>
               <GridListTile
                  key="Subheader"
                  cols={switchBrakePoints.includes(props.width) ? 1 : 2}
                  style={{
                     height: "auto",
                     textAlign: "center",
                  }}>
                  <ListSubheader component="div" className={classes.subheader}>
                     <Typography variant="h4" color="secondary">
                        TOP 10 {categorySelected && categorySelected.toString()}{" "}
                        SALES
                     </Typography>
                     <Divider />
                  </ListSubheader>
               </GridListTile>
               {top10Coupons?.map((coupon) => {
                  return (
                     <GridListTile key={coupon.id}>
                        <img
                           src={globals.urls.getImage + coupon.image}
                           alt={coupon.title}
                        />
                        <GridListTileBar
                           className={classes.titleBar}
                           title={
                              <Typography variant="subtitle2">
                                 {coupon.title}
                              </Typography>
                           }
                           subtitle={
                              <div>
                                 <Typography variant="caption">
                                    by: {coupon.company.name}
                                 </Typography>
                              </div>
                           }
                           actionIcon={
                              <IconButton
                                 className={classes.icon}
                                 onClick={() => {
                                    notify.error("Please log in for more !!");
                                 }}>
                                 <InfoIcon />
                              </IconButton>
                           }
                        />
                     </GridListTile>
                  );
               })}
            </GridList>
         </div>
      </div>
   );
}

export default withWidth()(Top10SalesCouponsList);
