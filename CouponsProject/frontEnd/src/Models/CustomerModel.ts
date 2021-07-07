class CustomerModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public image: string;
    public multiPartImage: FileList;
}

export default CustomerModel;