import {Product} from "@interface/Product";
import User from "@interface/User";

export interface BasketProduct {
    quantity: number;
    product: Product;
    user: User
}
