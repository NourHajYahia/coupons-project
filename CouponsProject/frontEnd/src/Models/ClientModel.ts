import { ClientType } from './ClientType';
import CompanyModel from './CompanyModel';
import CustomerModel from './CustomerModel';

class ClientModel {

    public token: string;
    public clientType: ClientType;
    public clientInfo: string | CompanyModel | CustomerModel;

    constructor(token: string, clientType: ClientType, clientInfo: string | CompanyModel | CustomerModel) {
        this.token = token;
        this.clientType = clientType;
        this.clientInfo = clientInfo;
    }

}

export default ClientModel;
