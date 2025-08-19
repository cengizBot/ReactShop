import {FC, JSX} from "react";
import {Navigate} from "react-router-dom";
import {useAppStore} from "@store/app/app";
import {HOME} from "@url/url";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
    const user = useAppStore((state) => state.user);

    if (!user) {
        return <Navigate to={HOME} replace/>;
    }

    return children;
};

export default PrivateRoute;
