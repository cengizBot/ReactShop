import './App.css';
import {JSX, useEffect} from "react";
import Navbar from "@components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ROUTING from "./routing/HomeRouting/HomeRouting";
import {ToastContainer} from "react-toastify";
import Routing from "@interface/Routing";
import {getUser} from "./api/user";
import {useAppStore} from "@store/app/app";

function App(): JSX.Element {
    const setUser = useAppStore((state) => state.setUser);

    useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            const userLogged = await getUser();
            if (userLogged) setUser(userLogged);
        };

        fetchUser();
    }, []);

    return (
        <div className="root">
            <BrowserRouter>
                <Navbar/>
                <div className={"pt-20"}>
                    <Routes>
                        {ROUTING.map((routing: Routing) => (
                            <Route
                                key={routing.path}
                                path={routing.path}
                                element={routing.element}
                            />
                        ))}
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
