import { Category } from './../Models/CouponModel';
import food from "../Assets/Images/CategoriesImages/food.png";
import clothing from "../Assets/Images/CategoriesImages/clothing.png";
import electronics from "../Assets/Images/CategoriesImages/electronics.png";
import shoes from "../Assets/Images/CategoriesImages/shoes.png";


const CategoriesImages = {

    images: [
        {
            "name": "All",
            "image": clothing,
            "category": null
        },
        {

            "name": "Food",
            "image": food,
            "category": Category.food
        },
        {

            "name": "Clothing",
            "image": clothing,
            "category": Category.clothing
        },
        {

            "name": "Electronics",
            "image": electronics,
            "category": Category.electronics
        },
        {

            "name": "Shoes",
            "image": shoes,
            "category": Category.shoes
        }
    ]


}
export default CategoriesImages;

