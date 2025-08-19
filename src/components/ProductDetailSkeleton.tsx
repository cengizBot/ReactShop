import {FC} from "react";

const ProductDetailSkeleton: FC = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Image placeholder */}
                <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-md h-64 bg-gray-300 rounded-lg shadow-md"/>
                </div>

                {/* Textual content placeholder */}
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    {/* Title */}
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>

                    {/* Price */}
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>

                    {/* Categories */}
                    <div className="flex gap-2">
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded w-10"></div>
                    </div>

                    {/* Description */}
                    <div className="h-20 bg-gray-300 rounded w-full"></div>

                    {/* Button */}
                    <div className="h-12 bg-gray-300 rounded w-40"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
