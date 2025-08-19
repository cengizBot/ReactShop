import {Menu} from "@headlessui/react";
import {FaSignOutAlt, FaUser} from "react-icons/fa";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import _ from 'lodash';
import {useAppStore} from "@store/app/app";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {PROFILE} from "@url/url";

export const UserMenu: FC = () => {

    const {t} = useTranslation<"default">("default");
    const clearUser = useAppStore((state) => state.clearUser);
    const navigate: NavigateFunction = useNavigate();

    const disconnection = (): void => {
        clearUser();
    }

    const account = (): void => {
        navigate(PROFILE, {replace: true})
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="flex items-center p-2 focus:outline-none cursor-pointer">
                <FaUser className="w-6 h-6 text-white"/>
            </Menu.Button>

            <Menu.Items
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white border shadow-lg focus:outline-none cursor-pointer">
                <div className="p-2">
                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={account}
                                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
                                    active ? "bg-gray-100" : ""
                                }`}
                            >
                                <FaUser/> {_.capitalize(t('account'))}
                            </button>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({active}) => (
                            <button
                                onClick={disconnection}
                                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg cursor-pointer ${
                                    active ? "bg-red-50 text-red-500" : "text-red-500"
                                }`}
                            >
                                <FaSignOutAlt/> {_.capitalize(t('delog'))}
                            </button>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
};
