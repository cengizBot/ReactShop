import Button from './Button';
import {useAppStore} from "@store/app/app";
import User from "@interface/User";
import {useTranslation} from "react-i18next";
import {FC, useState} from "react";
import Modal from "@components/Modal";
import RegisterForm from "@components/RegisterForm";
import ConnectionForm from "@components/ConnectionForm"; // ton formulaire de connexion
import {NavigateFunction, useNavigate} from "react-router-dom";
import {HOME} from "@url/url";
import {UserMenu} from "@components/UserMenu";
import LanguageSwitcher from "@components/LanguageSwitcher";


const REGISTER_FORM = "register" as const;
const CONNECTION_FORM = "connection" as const;
type FormType = typeof REGISTER_FORM | typeof CONNECTION_FORM;

const Navbar: FC = () => {
    const {t} = useTranslation<"default">("default");
    const user: User | null = useAppStore((state) => state.user);
    const navigate: NavigateFunction = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<FormType>(REGISTER_FORM);

    const openModal = (form: FormType): void => {
        setActiveForm(form);
        setIsModalOpen(true);
    }

    return (
        <nav className="w-full bg-primary shadow-md">
            <div className="mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    className="text-2xl font-bold text-white capitalize cursor-pointer"
                    onClick={() => navigate(HOME, {replace: true})}
                >
                    {t('website_name')}
                </div>
                <div className={'flex'}>
                    <LanguageSwitcher/>
                    {user ? (
                        <UserMenu/>
                    ) : (
                        <div className="flex">
                            <Button className="bg-blue-500 text-white capitalize" onClick={() => openModal("register")}>
                                {t('register')}
                            </Button>
                            <Button className="bg-blue-500 text-white capitalize ml-2"
                                    onClick={() => openModal("connection")}>
                                {t('connection')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {activeForm === REGISTER_FORM && <RegisterForm onClose={() => setIsModalOpen(false)}/>}
                {activeForm === CONNECTION_FORM && <ConnectionForm onClose={() => setIsModalOpen(false)}/>}
            </Modal>
        </nav>
    );
};

export default Navbar;
