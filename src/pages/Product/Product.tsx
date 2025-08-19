import {JSX, useCallback, useEffect, useState} from "react";
import {addToBasket, fetchProducts, getBasketByProduct, removeToBasket} from "@api/product";
import {Id, toast} from "react-toastify";
import {Product as ProductI} from "@interface/Product";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ProductDetailSkeleton from "@components/ProductDetailSkeleton";
import Button from "@components/Button";
import {useAppStore} from "@store/app/app";
import User from "@interface/User";
import _ from 'lodash';
import {BasketProduct} from "@interface/BasketProduct";

export default function Product(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const user: User | null = useAppStore((state) => state.user);
    const {t: tDefault} = useTranslation("default");
    const {t: tProduct} = useTranslation("product");
    const {id} = useParams<{ id: string }>();

    // States
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false); // combine add/remove
    const [product, setProduct] = useState<ProductI | null>(null);
    const [basketProduct, setBasketProduct] = useState<BasketProduct | null>(null);

    // Fetch product
    useEffect(() => {
        setLoading(true);
        fetchProducts()
            .then((data) => {
                const prod = data.find(p => p.id === Number(id));
                if (!prod) return navigate("/404", {replace: true});
                setProduct(prod);
            })
            .catch(() => toast.error(tDefault('error_load_data')))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    // Fetch basket for this product
    useEffect(() => {
        if (!product || !user) return;
        getBasketByProduct(product, user)
            .then(setBasketProduct);
    }, [product, user]);

    // Helpers
    const needLogged = useCallback((): Id => toast.error(_.capitalize(tDefault("need_to_connect"))), [tDefault]);

    const updateBasket = async (action: "add" | "remove"): Promise<void> => {
        if (!product) return;
        if (!user) {
            needLogged();
            return;
        }

        setLoadingAction(true);
        const fn = action === "add" ? addToBasket : removeToBasket;
        const successMsg = action === "add" ? 'success_basket_add_product' : 'success_basket_remove_product';
        const errorMsg = action === "add" ? 'error_basket_add_product' : 'error_basket_remove_product';

        try {
            const success = await fn(product, user);
            if (success) {
                toast.success(tProduct(successMsg));
                setBasketProduct(prev => ({
                    product: prev?.product || product,
                    user: prev?.user || user,
                    quantity: (prev?.quantity || 0) + (action === "add" ? 1 : -1),
                }));
            }
        } catch {
            toast.error(tProduct(errorMsg));
        } finally {
            setLoadingAction(false);
        }
    };

    if (loading) return <div className="p-5"><ProductDetailSkeleton/></div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex justify-center">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full max-w-md rounded-lg shadow-md object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
                    <p className="text-2xl text-gray-700 mb-4">{product?.price.toFixed(2)} €</p>
                    <div className="mb-4">
                        {product?.categories.map(cat => (
                            <span key={cat} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2">
                                {cat}
                            </span>
                        ))}
                    </div>
                    {(basketProduct?.quantity ?? 0) > 0 && (
                        <p className="text-gray-600 mb-6">
                            <span
                                className={"font-bold"}>{_.capitalize(tDefault('quantity'))}:</span> {basketProduct?.quantity}
                        </p>
                    )}
                    <p className="text-gray-600 mb-6">{product?.description}</p>
                    <div className="flex gap-4">
                        {(basketProduct?.quantity ?? 0) > 0 && (
                            <Button
                                onClick={() => updateBasket("remove")}
                                disabled={loadingAction}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg transition"
                            >
                                {tProduct('remove_product')}
                            </Button>
                        )}
                        <Button
                            onClick={() => updateBasket("add")}
                            disabled={loadingAction}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg transition"
                        >
                            {tProduct('add_product')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
