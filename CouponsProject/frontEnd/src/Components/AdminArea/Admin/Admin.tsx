import {
   Button,
   IconButton,
   InputBase,
   makeStyles,
   Menu,
   MenuItem,
   Modal,
   Paper,
   Tab,
   Tabs,
   Theme,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ClientType } from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notifications";
import CompanyForm from "../CompaniesArea/CompanyForm/CompanyForm";
import CustomerForm from "../CustomersArea/CustomerForm/CustomerForm";
import CustomersList from "../CustomersArea/CustomersList/CustomersList";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CompaniesList from "../CompaniesArea/CompaniesList/CompaniesList";

function getModalStyle() {
   const top = 50;
   const left = 50;

   return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
   };
}

const useStyles = makeStyles((theme: Theme) => ({
   admin: {
      display: "flex",
      flexDirection: "column",
   },
   add: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "2px",
      boxShadow: theme.shadows[10],
      padding: theme.spacing(1, 0, 1),
      width: 280,
      maxHeight: 800,
      overflow: "auto",
      margin: "0 auto",
   },
   paper: {
      display: "flex",
      margin: "0 auto",
      flexDirection: "row",
      marginBottom: 15,
      width: "100%",
      position: "sticky",
      top: 0,
      zIndex: 1,
   },
   tabs: {
      display: "flex",
      flexGrow: 1,
   },
   icon: {
      margin: "auto",
      height: 40,
      width: 40,
   },
   searchInput: {
      maxWidth: 120,
   },
}));

function Admin(): JSX.Element {
   const history = useHistory();
   const [modalStyle] = useState(getModalStyle);
   const classes = useStyles();
   const [value, setValue] = React.useState<number>(0);
   const [searchValue, setSearchValue] = useState<string>("");
   const [searchBar, setSearchBar] = useState<number>(0);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const [modalOpen, setModalOpen] = React.useState(false);
   const { client }: { client: string } = useParams();

   useEffect(() => {
      if (
         store.getState().authState.client?.clientType ===
         ClientType.Administrator
      ) {
         if (client === "customers") {
            setValue(1);
         } else if (client === "companies" || client === undefined) {
            setValue(0);
         } else {
            history.push("/Page404");
         }
      } else {
         notify.error("You are not Authorized");
         history.push("/");
      }
   }, [client, history]);

   const handleSearch = (event: SyntheticEvent) => {
      setSearchValue((event.target as HTMLInputElement).value.toString());
   };

   const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      if (newValue === 1) {
         history.push("/admin/customers");
      } else {
         history.push("/admin/companies");
      }
   };

   const handleSearchBar = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleOpen = () => {
      setModalOpen(true);
   };

   const handleClose = () => {
      setModalOpen(false);
   };

   return (
      <div className={classes.admin}>
         <Paper className={classes.paper}>
            <Tabs
               value={value}
               onChange={handleTabChange}
               className={classes.tabs}>
               <Tab label="Companies" />
               <Tab label="Customers" />
            </Tabs>
            <div>
               <IconButton
                  id="searchMenu"
                  aria-label="search"
                  aria-haspopup="true"
                  onClick={handleSearchBar}>
                  {searchBar === 0 ? <SearchIcon /> : "Id"}
                  <ArrowDropDownIcon />
               </IconButton>
               <InputBase
                  className={classes.searchInput}
                  placeholder={
                     searchBar === 0 ? "Search By Name" : "Search By Id"
                  }
                  inputProps={{
                     min: 0,
                     "aria-label":
                        searchBar === 0 ? "Search By Name" : "Search By Id",
                  }}
                  value={searchValue}
                  type={searchBar === 0 ? "" : "number"}
                  onChange={handleSearch}
                  autoFocus
               />
               <Button onClick={handleOpen}>
                  <AddCircle className={classes.icon} color="primary" />
               </Button>
            </div>
         </Paper>
         <div>
            {value === 0 ? (
               <CompaniesList
                  filterValue={searchValue}
                  filterType={searchBar}
               />
            ) : (
               <CustomersList
                  filterValue={searchValue}
                  filterType={searchBar}
               />
            )}
         </div>
         <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-add">
            <div id="modal-add" className={classes.add} style={modalStyle}>
               {value === 0 ? (
                  <CompanyForm add handleClose={handleClose} />
               ) : (
                  <CustomerForm add handleClose={handleClose} />
               )}
            </div>
         </Modal>
         <Menu
            id="searchMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}>
            <MenuItem
               onClick={() => {
                  setSearchBar(0);
                  handleMenuClose();
               }}>
               Name
            </MenuItem>
            <MenuItem
               onClick={() => {
                  setSearchBar(1);
                  handleMenuClose();
               }}>
               Id
            </MenuItem>
         </Menu>
      </div>
   );
}

export default Admin;
