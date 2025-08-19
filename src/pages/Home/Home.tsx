import {JSX, useEffect, useState} from "react";
import {useAppStore} from "@store/app/app";
import {useTranslation} from "react-i18next";
import {fetchProducts} from "@api/product";
import ProductCard from "@components/ProductCard";
import ProductSkeleton from "@components/ProductSkeleton";
import {Product} from "@interface/Product";
import SearchBar from "@components/SearchBar";

export default function Home(): JSX.Element {

    const setProducts = useAppStore((state) => state.setProducts);
    const products: Product[] = useAppStore((state) => state.products);

    const {t: tDefault} = useTranslation("default");
    const {t: tHome} = useTranslation("home");


    const [searchProducts, setSearchProducts] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        setLoading(true);
        fetchProducts()
            .then((data: Product[]) => {
                setProducts(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredProducts: Product[] = products.filter(p =>
        p.name.toLowerCase().includes(searchProducts.toLowerCase())
    );

    return (
        <div className="w-11/12 mx-auto py-8">
            <div className="w-full sm:w-1/2 mx-auto mb-6">
                <SearchBar value={searchProducts} label={tHome('search_product')}
                           onChange={setSearchProducts} className="w-full"/>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({length: 6}).map((_, i) => (
                        <ProductSkeleton key={i}/>
                    ))}
                </div>
            ) : (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 py-20 justify-center items-center">
                    {searchProducts.length > 0 && filteredProducts.length === 0 && (
                        <p className="text-center text-gray-500 text-xl font-semibold mt-4 capitalize">{tHome('not_product_found')}</p>
                    )}
                    {filteredProducts.map((product: Product) => (
                        <div className="max-w-xs w-full mx-auto" key={product.id}>
                            <ProductCard product={product}/>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
}
