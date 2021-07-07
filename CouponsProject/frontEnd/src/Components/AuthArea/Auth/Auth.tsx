import { Component } from "react";
import { Unsubscribe } from "redux";
import { ClientType } from "../../../Models/ClientType";
import CompanyModel from "../../../Models/CompanyModel";
import CustomerModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import AdminAuthMenu from "../AdminAuthMenu/AdminAuthMenu";
import CompanyAuthMenu from "../CompanyAuthMenu/CompanyAuthMenu";
import CustomerAuthMenu from "../CustomerAuthMenu/CustomerAuthMenu";
import GuestAuthMenu from "../GuestAuthMenu/GuestAuthMenu";

interface AuthState {
   token: string;
   clientType: ClientType;
   clientInfo: string | CompanyModel | CustomerModel;
}

class Auth extends Component<{}, AuthState> {
   private unsubscribeMe: Unsubscribe;

   public constructor(props: AuthState) {
      super(props);
      this.state = {
         token: store.getState().authState.client?.token,
         clientType: store.getState().authState.client?.clientType,
         clientInfo: store.getState().authState.client?.clientInfo,
      };
   }

   public componentDidMount(): void {
      this.unsubscribeMe = store.subscribe(() => {
         this.setState({
            token: store.getState().authState.client?.token,
            clientType: store.getState().authState.client?.clientType,
            clientInfo: store.getState().authState.client?.clientInfo,
         });
      });
   }

   public render(): JSX.Element {
      return (
         <div className="Auth">
            {this.state.clientType === ClientType.Administrator && (
               <AdminAuthMenu clientInfo={this.state.clientInfo as string} />
            )}
            {this.state.clientType === ClientType.Company && (
               <CompanyAuthMenu
                  clientInfo={this.state.clientInfo as CompanyModel}
               />
            )}
            {this.state.clientType === ClientType.Customer && (
               <CustomerAuthMenu
                  clientInfo={this.state.clientInfo as CustomerModel}
               />
            )}
            {!this.state.clientType && <GuestAuthMenu />}
         </div>
      );
   }

   public componentWillUnmount(): void {
      this.unsubscribeMe();
   }
}

export default Auth;
