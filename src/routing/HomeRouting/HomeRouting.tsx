import type Routing from '@interface/Routing';
import Home from "@pages/Home/Home";
import Product from "@pages/Product/Product";
import Profile from "@pages/Profile/Profile";
import {_404} from "../DefaultRouting/DefaultRouting";
import {HOME, PRODUCT_FIND, PROFILE} from "@url/url";
import PrivateRoute from "@routing/PrivateRouting/PrivateRouting";

const ROUTING: Routing[] = [
    {
        path: HOME,
        element: <Home/>,
    },
    {
        path: PRODUCT_FIND,
        element: <Product/>,
    },
    {
        path: PROFILE,
        element: <PrivateRoute><Profile/></PrivateRoute>,
    },
    {..._404}
];

export default ROUTING;
