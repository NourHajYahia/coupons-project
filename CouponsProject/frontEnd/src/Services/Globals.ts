
// Globals settings which are the same for development and production
class Globals {

}

// Global settings witch are suitable only for development
class DevelopmentGlobals extends Globals {
    public urls = {
        //login
        login: "http://localhost:8080/login/login",
        //admin/company
        addCompany: "http://localhost:8080/admin/addCompany",
        updateCompany: "http://localhost:8080/admin/updateCompany",
        getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
        getCompany: "http://localhost:8080/admin/getCompany",
        deleteCompany: "http://localhost:8080/admin/deleteCompany",
        //admin/customer
        addCustomer: "http://localhost:8080/admin/addCustomer",
        updateCustomer: "http://localhost:8080/admin/updateCustomer",
        getAllCustomers: "http://localhost:8080/admin/getAllCustomers",
        getCustomer: "http://localhost:8080/admin/getCustomer",
        deleteCustomer: "http://localhost:8080/admin/deleteCustomer",
        //company
        addCoupon: "http://localhost:8080/company/addCoupon",
        updateCoupon: "http://localhost:8080/company/updateCoupon",
        deleteCoupon: "http://localhost:8080/company/deleteCoupon",
        getCompanyInfo: "http://localhost:8080/company/getCompanyInfo",
        getCompanyCategories: "http://localhost:8080/company/getCompanyCategories",
        getAllCompanyCoupons: "http://localhost:8080/company/getAllCompanyCoupons",
        //Customer
        getCustomerInfo: "http://localhost:8080/customer/getCustomerInfo",
        getAllCustomerCoupons: "http://localhost:8080/customer/getCustomerCoupons",
        purchaseCoupon: "http://localhost:8080/customer/purchaseCoupon",
        getAllCustomerNotCoupons: "http://localhost:8080/customer/getCustomerNotCoupons",
        //Guest
        getTop10Coupons: "http://localhost:8080/guest/getTop10Coupons",
        //Images
        getImage: "http://localhost:8080/images/"
    }
}

// Global settings witch are suitable only for production
class ProductionGlobals extends Globals {
    public urls = {
        //login
        login: "http://localhost:8080/login/login",
        //Admin company
        addCompany: "http://localhost:8080/admin/addCompany",
        updateCompany: "http://localhost:8080/admin/updateCompany",
        getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
        getCompany: "http://localhost:8080/admin/getCompany",
        deleteCompany: "http://localhost:8080/admin/deleteCompany",
        //Admin customer
        addCustomer: "http://localhost:8080/admin/addCustomer",
        updateCustomer: "http://localhost:8080/admin/updateCustomer",
        getAllCustomers: "http://localhost:8080/admin/getAllCustomers",
        getCustomer: "http://localhost:8080/admin/getCustomer",
        deleteCustomer: "http://localhost:8080/admin/deleteCustomer",
        //Company
        addCoupon: "http://localhost:8080/company/addCoupon",
        updateCoupon: "http://localhost:8080/company/updateCoupon",
        deleteCoupon: "http://localhost:8080/company/deleteCoupon",
        getCompanyInfo: "http://localhost:8080/company/getCompanyInfo",
        getCompanyCategories: "http://localhost:8080/company/getCompanyCategories",
        getAllCompanyCoupons: "http://localhost:8080/company/getAllCompanyCoupons",
        //Customer
        getCustomerInfo: "http://localhost:8080/customer/getCustomerInfo",
        getAllCustomerCoupons: "http://localhost:8080/customer/getAllCustomerCoupons",
        purchaseCoupon: "http://localhost:8080/customer/purchaseCoupon",
        getAllCustomerNotCoupons: "http://localhost:8080/customer/getCustomerNotCoupons",
        //Guest
        getTop10Coupons: "http://localhost:8080/guest/getTop10Coupons",
        //Images
        getImage: "http://localhost:8080/images/"
    }
}

const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;