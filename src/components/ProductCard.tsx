import {FC} from "react";
import {Product} from "@interface/Product";
import {Category} from "@type/categories";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {PRODUCT_FIND} from "@url/url";
import {buildUrl} from "@api/api";

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({product}: ProductCardProps) => {
    const navigate: NavigateFunction = useNavigate();
    const goToProduct = (): void => {
        navigate(buildUrl(PRODUCT_FIND, {id: product.id}));
    };

    return (
        <div
            onClick={goToProduct}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">{product.price.toFixed(2)} €</span>
                    <div className="flex gap-1 flex-wrap">
                        {product.categories.map((cat: Category) => (
                            <span key={cat} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
