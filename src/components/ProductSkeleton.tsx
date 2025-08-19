import {FC} from "react";

const ProductSkeleton: FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-md animate-pulse overflow-hidden">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="flex gap-1 mt-2">
                    <div className="h-5 w-10 bg-gray-300 rounded-full"></div>
                    <div className="h-5 w-12 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
