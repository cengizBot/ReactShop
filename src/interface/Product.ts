import {Category} from "@type/categories";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    categories: Category[];
    image: string;
}
