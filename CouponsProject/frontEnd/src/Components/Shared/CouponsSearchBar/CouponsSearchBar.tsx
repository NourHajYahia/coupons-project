import {
   fade,
   IconButton,
   InputBase,
   makeStyles,
   Theme,
   Typography,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CategoryIcon from "@material-ui/icons/Category";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { SyntheticEvent, useEffect, useState } from "react";
import { Category, CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import { CouponsDownloadedAction } from "../../../Redux/CouponsState";
import JwtAxios from "../../../Services/JwtAxios";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notifications";
import { toggleViewAction } from "../../../Redux/CategoryViewState";
import { ClientType } from "../../../Models/ClientType";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
   searchBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& > * ": {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
      },
   },
   inputRoot: {
      color: "inherit",
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("lg")]: {
         width: "20ch",
         "&:focus": {
            width: "35ch",
         },
      },
   },
   search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
         marginLeft: theme.spacing(1),
         width: "auto",
      },
   },
   maxPrice: {
      maxWidth: 100,
   },
}));

function CouponsSearchBar() {
   const classes = useStyles();
   const location = useLocation();
   const [searchValue, setSearchValue] = useState<string>("");
   const [maxPrice, setMaxPrice] = useState<number>(null);
   const [categorySelected, setCategorySelected] = useState<Category>(null);
   const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

   useEffect(() => {
      const unsubscribeMe = store.subscribe(() => {
         setCategorySelected(store.getState().categoryViewState.category);
         setCategoryOpen(store.getState().categoryViewState.viewOpen);
      });
      return () => {
         unsubscribeMe();
      };
   });

   useEffect(() => {
      const listFilterByName = (coupons: CouponModel[]) => {
         if (coupons) {
            const list = coupons.filter((coupon) => {
               if (
                  (coupon.title + coupon.description)
                     .toLowerCase()
                     .includes(searchValue.toLowerCase())
               ) {
                  return coupon;
               }
               return null;
            });
            store.dispatch(CouponsDownloadedAction(list));
         }
      };
      const handleFiltering = async () => {
         let response: any;
         try {
            if (
               store.getState().authState.client?.clientType ===
               ClientType.Company
            ) {
               response = await JwtAxios.get<CouponModel[]>(
                  globals.urls.getAllCompanyCoupons,
                  {
                     params: {
                        maxPrice: maxPrice === 0 ? null : maxPrice,
                        category:
                           categorySelected == null ? null : categorySelected,
                     },
                  }
               );
               store.dispatch(CouponsDownloadedAction(response?.data));
            }
            if (
               store.getState().authState.client?.clientType ===
               ClientType.Customer
            ) {
               if (location.pathname === "/customer") {
                  response = await JwtAxios.get<CouponModel[]>(
                     globals.urls.getAllCustomerNotCoupons,
                     {
                        params: {
                           maxPrice: maxPrice === 0 ? null : maxPrice,
                           category:
                              categorySelected == null
                                 ? null
                                 : categorySelected,
                        },
                     }
                  );
                  store.dispatch(CouponsDownloadedAction(response?.data));
               }
               if (location.pathname === "/customer/myCoupons") {
                  response = await JwtAxios.get<CouponModel[]>(
                     globals.urls.getAllCustomerCoupons,
                     {
                        params: {
                           maxPrice: maxPrice === 0 ? null : maxPrice,
                           category:
                              categorySelected == null
                                 ? null
                                 : categorySelected,
                        },
                     }
                  );
                  store.dispatch(CouponsDownloadedAction(response?.data));
               }
            }
            listFilterByName(response?.data);
         } catch (err) {
            notify.error(err);
            console.log(err);
         }
      };
      handleFiltering();
   }, [searchValue, maxPrice, categorySelected, location]);

   const handleSearchValueChange = (event: SyntheticEvent) => {
      setSearchValue((event.target as HTMLInputElement).value);
   };

   const handleMaxPriceChange = (event: SyntheticEvent) => {
      setMaxPrice(Number((event.target as HTMLInputElement).value));
   };

   const handleCategoryOpen = () => {
      setCategoryOpen(true);
      store.dispatch(toggleViewAction(!categoryOpen));
   };

   return (
      <div className="CouponsSearchBar">
         <div className={classes.searchBar}>
            <div>
               <CategoryIcon />
               <Typography>Category</Typography>
               <IconButton onClick={handleCategoryOpen}>
                  {categoryOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
               </IconButton>
            </div>
            <div className={classes.search}>
               <SearchIcon />
               <InputBase
                  placeholder={"Search By Name"}
                  inputProps={{
                     "aria-label": "Search By Name",
                  }}
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput,
                  }}
                  value={searchValue}
                  onChange={handleSearchValueChange}
                  autoFocus
               />

               <AttachMoneyIcon />
               <InputBase
                  placeholder={"MaxPrice"}
                  inputProps={{
                     min: 0,
                     "aria-label": "MaxPrice",
                  }}
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput,
                  }}
                  type="number"
                  defaultValue=""
                  onChange={handleMaxPriceChange}
                  autoFocus
               />
            </div>
         </div>
      </div>
   );
}
export default CouponsSearchBar;
