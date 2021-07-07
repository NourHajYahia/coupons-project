import { Redirect, Route, Switch } from "react-router-dom";
import { ClientType } from "../../../Models/ClientType";
import store from "../../../Redux/Store";
import Admin from "../../AdminArea/Admin/Admin";
import CompanyInfo from "../../AdminArea/CompaniesArea/CompanyInfo/CompanyInfo";
import CustomerInfo from "../../AdminArea/CustomersArea/CustomerInfo/CustomerInfo";
import Logout from "../../AuthArea/Logout/Logout";
import CompanyHome from "../../CompanyUserArea/CompanyHome/CompanyHome";
import MyCompanyInfo from "../../CompanyUserArea/MyCompanyInfo/MyCompanyInfo";
import CustomerHome from "../../CustomerUserArea/CustomerHome/CustomerHome";
import CouponInfo from "../../Shared/CouponInfo/CouponInfo";
import MyCustomerInfo from "../../CustomerUserArea/MyCustomerInfo/MyCustomerInfo";
import Page404 from "../../Shared/Page404/Page404";
import GuestHome from "../../GuestArea/GuestHome/GuestHome";
import { useEffect, useState } from "react";

function Router(): JSX.Element {
   const [clientType, setClientType] = useState<ClientType>(
      store.getState().authState.client?.clientType
   );

   useEffect(() => {
      const unSubscribeMe = store.subscribe(() => {
         setClientType(store.getState().authState.client?.clientType);
      });
      return () => {
         unSubscribeMe();
      };
   });

   const handleRedirect = (): string => {
      switch (clientType) {
         case ClientType.Administrator:
            return "/admin";
         case ClientType.Company:
            return "/company";
         case ClientType.Customer:
            return "/customer";
         default:
            return "/guest";
      }
   };

   return (
      <div className="Router">
         <Switch>
            <Route path="/logout" component={Logout} exact />
            <Route path="/admin/:client?" component={Admin} exact />
            <Route path="/admin/companies/:id" component={CompanyInfo} exact />
            <Route path="/admin/customers/:id" component={CustomerInfo} exact />
            <Route path="/company" component={CompanyHome} exact />
            <Route path="/company/myInfo" component={MyCompanyInfo} exact />
            <Route path="/customer" component={CustomerHome} exact />
            <Route path="/customer/myCoupons" component={CustomerHome} exact />
            <Route path="/customer/myInfo" component={MyCustomerInfo} exact />
            <Route path="/coupons/:id" component={CouponInfo} exact />
            <Route path="/guest" component={GuestHome} exact />
            <Redirect path="/" to={handleRedirect()} exact />
            <Route component={Page404} />
         </Switch>
      </div>
   );
}

export default Router;
