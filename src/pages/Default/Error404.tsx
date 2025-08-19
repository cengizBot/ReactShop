import {JSX} from "react";

function Error404(): JSX.Element {
    return (
        <div className="flex items-center justify-center py-10">
            <h1 className="text-4xl font-bold text-red-600 text-center">
                404 - Page Not Found
            </h1>
        </div>
    );
}

export default Error404;
