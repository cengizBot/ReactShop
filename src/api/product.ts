import {Product} from "@interface/Product";
import {BasketProduct} from "@interface/BasketProduct";
import User from "@interface/User";
import {getCookie, setCookie} from "@util/cookie";
import {api, ApiResponse, fakeApiDelay} from "@api/api";
import {PRODUCTS} from "@url/url";

export const NAME_COOKIE_BASKET_PRODUCTS = "basket_products" as const;

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
    let products: Product[] = [];
    await api.get<Product[]>(PRODUCTS).then((response: ApiResponse<Product[]>) => {
        if (response.data) products = response.data;
        if (response.error) console.error("Error fetchProducts:", response.error);
    });
    return products;
};

// Add a product to the basket
export const addToBasket = async (product: Product, user: User): Promise<boolean> => {
    try {
        await fakeApiDelay();

        const basketProducts: BasketProduct[] = getCookie(NAME_COOKIE_BASKET_PRODUCTS) || [];

        const existingProductIndex = basketProducts.findIndex(
            (p) => p.product.id === product.id && p.user.email === user.email
        );

        if (existingProductIndex !== -1) {
            basketProducts[existingProductIndex].quantity += 1;
        } else {
            basketProducts.push({product, quantity: 1, user} as BasketProduct);
        }

        // Replace cookie with updated flat array
        setCookie(NAME_COOKIE_BASKET_PRODUCTS, basketProducts);

        return true;
    } catch (err) {
        console.error("Simulated error in addToBasket:", err);
        return false;
    }
};

// Remove a product from the basket
export const removeToBasket = async (product: Product, user: User): Promise<boolean> => {
    try {
        await fakeApiDelay();

        const basketProducts: BasketProduct[] = getCookie(NAME_COOKIE_BASKET_PRODUCTS) || [];

        const existingProductIndex = basketProducts.findIndex(
            (p) => p.product.id === product.id && p.user.email === user.email
        );

        if (existingProductIndex !== -1) {
            basketProducts[existingProductIndex].quantity -= 1;

            if (basketProducts[existingProductIndex].quantity <= 0) {
                basketProducts.splice(existingProductIndex, 1);
            }

            setCookie(NAME_COOKIE_BASKET_PRODUCTS, basketProducts);
        }

        return true;
    } catch (err: unknown) {
        console.error("Simulated error in removeToBasket:", err);
        return false;
    }
};

// Get the basket of a user
export const getBasket = async (user: User): Promise<BasketProduct[]> => {
    try {
        await fakeApiDelay();

        const basketProducts: BasketProduct[] | null = getCookie(NAME_COOKIE_BASKET_PRODUCTS);
        return basketProducts?.filter((bp: BasketProduct): boolean => bp.user.email === user.email) || [];
    } catch (err) {
        console.error("Simulated error in getBasket:", err);
        return [];
    }
};

// Get a basket entry by product
export const getBasketByProduct = async (
    product: Product,
    user: User
): Promise<BasketProduct | null> => {
    try {
        await fakeApiDelay();

        const basketProducts: BasketProduct[] = getCookie(NAME_COOKIE_BASKET_PRODUCTS) || [];

        // Return the first matching product
        const foundProduct = basketProducts.find(
            (bp: BasketProduct): boolean =>
                bp.user.email === user.email && bp.product.id === product.id
        );

        return foundProduct || null;
    } catch (err: unknown) {
        console.error("Simulated error in getBasketByProduct:", err);
        return null;
    }
};
