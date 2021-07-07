import { Category } from './../Models/CouponModel';
import food from "../Assets/Images/LandingImages/food.jpg";
import clothing from "../Assets/Images/LandingImages/clothing.jpg";
import electronics from "../Assets/Images/LandingImages/electronics.jpg";
import shoes from "../Assets/Images/LandingImages/shoes.jpg";

const LandingImages = {

    images: [
        {
            "name": "All",
            "image": clothing,
            "category": ""
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
export default LandingImages;

