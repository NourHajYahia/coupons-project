import CompanyModel from "./CompanyModel";

export class CouponModel {
    public id: number;
    public category: Category;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public company: CompanyModel
    public image: string;
    public multiPartImage: FileList;

}

export enum Category {
    food = "FOOD",
    electronics = "ELECTRONICS",
    clothing = "CLOTHING",
    shoes = "SHOES"
}
