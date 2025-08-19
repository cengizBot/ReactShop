import {JSX, useEffect, useState} from "react";
import {addToBasket, getBasket, removeToBasket} from "@api/product";
import {BasketProduct} from "@interface/BasketProduct";
import {useAppStore} from "@store/app/app";
import User from "@interface/User";
import {useTranslation} from "react-i18next";
import _ from "lodash";
import {Table} from "@components/Table";
import {Column} from "@interface/Column";
import Button from "@components/Button";
import {buildUrl} from "@api/api";
import {PRODUCT_FIND} from "@url/url";

export default function Profile(): JSX.Element {
    const user: User | null = useAppStore((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);
    const {t} = useTranslation<"profile">("profile");

    const [basketProducts, setBasketProducts] = useState<BasketProduct[]>([]);

    const updateBasket = (basketProduct: BasketProduct, add: boolean = true): void => {
        setBasketProducts(prev =>
            prev
                .map(item =>
                    item.product.id === basketProduct.product.id
                        ? {...item, quantity: add ? item.quantity + 1 : item.quantity - 1}
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }

    const columns: Column<BasketProduct>[] = [
        {
            header: t('product'),
            accessor: (row: BasketProduct) => (
                <a
                    href={buildUrl(PRODUCT_FIND, {id: row.product.id})}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-blue-500"
                >
                    {row.product.name}
                </a>)
        },
        {
            header: t('catef'),
            accessor: (row: BasketProduct) => row.product.categories.join(", ")
        },
        {
            header: t('qt'),
            accessor: (row: BasketProduct) => (
                <div className="flex items-center gap-2">
                    <Button
                        style={{width: '24px', height: '24px'}}
                        className="bg-red-500 text-white rounded cursor-pointer flex justify-center items-center"
                        onClick={async () => {
                            if (!user) return;
                            setLoadingAction(true);
                            const success = await removeToBasket(row.product, user);
                            if (success) updateBasket(row, false);
                            setLoadingAction(false);
                        }}
                    >-</Button>
                    <span>{row.quantity}</span>
                    <Button
                        style={{width: '24px', height: '24px'}}
                        className="bg-green-600 text-white rounded cursor-pointer"
                        onClick={async () => {
                            if (!user) return;
                            setLoadingAction(true);
                            const success = await addToBasket(row.product, user);
                            if (success) updateBasket(row);
                            setLoadingAction(false);
                        }}
                    >+</Button>
                </div>
            )
        },
        {
            header: t('price'),
            accessor: (row: BasketProduct) => (row.product.price * row.quantity).toFixed(2) + " €"
        },
    ];

    useEffect(() => {
        setLoading(true);
        if (!user) return;
        getBasket(user)
            .then((data: BasketProduct[]) => setBasketProducts(data))
            .finally(() => setLoading(false));
    }, [user]);

    const totalPrice: number = basketProducts.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const footer: JSX.Element = (
        <tr className="border-t">
            <td colSpan={3} className="font-bold py-3 pr-6 text-right capitalize">{t('total')}:</td>
            <td className="font-bold py-3 pl-6 text-left">{totalPrice.toFixed(2)} €</td>
        </tr>
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">{t('title')}</h1>
            <div className="bg-white p-6 rounded shadow relative">
                <p>Email: {user?.email}</p>
                <h2 className="text-xl font-semibold mt-4 mb-4">{_.capitalize(t('current_orders'))}</h2>

                {loading ? (
                    <div className="bg-gray-300 animate-pulse rounded w-full h-[200px]"/>
                ) : basketProducts.length === 0 ? (
                    <p>{_.capitalize(t('no_orders_in_progress'))}</p>
                ) : (
                    <div className="overflow-x-auto relative">
                        {/* Overlay lors d'une action */}
                        {loadingAction && (
                            <div
                                className="absolute inset-0 flex justify-center items-center z-10"
                                style={{backgroundColor: 'rgba(229, 231, 235, 0.5)'}} // gris clair semi-transparent
                            >
                                <div
                                    className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                            </div>
                        )}

                        <Table columns={columns} data={basketProducts} footer={footer} minWidth="600px"/>
                    </div>

                )}
            </div>
        </div>
    );
}
