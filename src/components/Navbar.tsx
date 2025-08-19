import {FC, useEffect, useRef, useState} from "react";
import {useAppStore} from "@store/app/app";
import User from "@interface/User";
import {useTranslation} from "react-i18next";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {HOME} from "@url/url";
import Modal from "@components/Modal";
import RegisterForm from "@components/RegisterForm";
import ConnectionForm from "@components/ConnectionForm";
import LanguageSwitcher from "@components/LanguageSwitcher";
import {UserMenu} from "@components/UserMenu";
import {FiUser} from "react-icons/fi"; // icône utilisateur

const REGISTER_FORM = "register" as const;
const CONNECTION_FORM = "connection" as const;
type FormType = typeof REGISTER_FORM | typeof CONNECTION_FORM;

const Navbar: FC = () => {
    const {t} = useTranslation<"default">("default");
    const user: User | null = useAppStore((state) => state.user);
    const navigate: NavigateFunction = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<FormType>(REGISTER_FORM);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const openModal = (form: FormType) => {
        setActiveForm(form);
        setIsModalOpen(true);
        setIsMenuOpen(false); // fermer le menu quand on ouvre un formulaire
    };

    // Fermer le menu si clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="w-full bg-primary shadow-md">
            <div className="mx-auto px-4 py-4 flex justify-between items-center">
                <div
                    className="text-2xl font-bold text-white capitalize cursor-pointer"
                    onClick={() => navigate(HOME, {replace: true})}
                >
                    {t('website_name')}
                </div>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher/>

                    {user ? (
                        <UserMenu/>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            {/* Icône utilisateur */}
                            <button
                                className="text-white text-xl p-2 rounded hover:bg-white/20"
                                onClick={() => setIsMenuOpen(prev => !prev)}
                            >
                                <FiUser/>
                            </button>

                            {/* Sous-menu */}
                            {isMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-20 overflow-hidden">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                                        onClick={() => openModal(REGISTER_FORM)}
                                    >
                                        {t('register')}
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                                        onClick={() => openModal(CONNECTION_FORM)}
                                    >
                                        {t('connection')}
                                    </button>
                                </div>
                            )}
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
