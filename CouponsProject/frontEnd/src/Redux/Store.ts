import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { categoryViewReducer } from "./CategoryViewState";
import { companiesReducer } from "./CompaniesState";
import { couponsReducer } from "./CouponsState";

import { customersReducer } from "./CustomersState";
import { darkModeReducer } from "./DarkModeState";


const reducers = combineReducers({
    authState: authReducer, companiesState: companiesReducer,
    customerState: customersReducer, couponState: couponsReducer, categoryViewState: categoryViewReducer, darkModeState: darkModeReducer
})
const store = createStore(reducers);

export default store;