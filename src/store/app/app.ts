import {create} from 'zustand';
import type User from "@interface/User";
import {Product} from "@interface/Product";
import {BasketProduct} from "@interface/BasketProduct";
import {removeCookie, setCookie} from "@util/cookie";
import {NAME_COOKIE_USER_LOGGED} from "@api/user";

interface AppStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;

    products: Product[];
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    clearProducts: () => void;

    basketsProducts: BasketProduct[];
    addToBasket: (product: Product) => void;
    removeFromBasket: (productId: number) => void;
    clearBasket: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
    user: null,
    setUser: (user: User): void => {
        set({user});
        setCookie(NAME_COOKIE_USER_LOGGED, user)
    },
    clearUser: (): void => {
        set({user: null});
        removeCookie(NAME_COOKIE_USER_LOGGED);
    },

    products: [],
    setProducts: (products: Product[]): void => set({products}),
    addProduct: (product: Product): void =>
        set((state) => ({products: [...state.products, product]})),
    clearProducts: () => set({products: []}),

    basketsProducts: [],
    addToBasket: (product: Product): void =>
        set((state) => {
            if (!state.user) return state; // optionnel : vérifier si user connecté
            const existing = state.basketsProducts.find(
                (p) => p.product.id === product.id
            );
            if (existing) {
                // augmenter la quantité si déjà présent
                return {
                    basketsProducts: state.basketsProducts.map((p) =>
                        p.product.id === product.id
                            ? {...p, quantity: p.quantity + 1}
                            : p
                    ),
                };
            }
            // ajouter un nouveau BasketProduct
            return {
                basketsProducts: [
                    ...state.basketsProducts,
                    {product, user: state.user, quantity: 1},
                ],
            };
        }),
    removeFromBasket: (productId: number): void =>
        set((state) => ({
            basketsProducts: state.basketsProducts.filter((p: BasketProduct): boolean => p.product.id !== productId)
        })),
    clearBasket: (): void => set({basketsProducts: []}),
}));
