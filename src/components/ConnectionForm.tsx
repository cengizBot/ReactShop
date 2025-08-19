import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import Input from "@components/Input";
import Button from "@components/Button";
import {createUsers, fetchUsers} from "@api/user";
import User from "@interface/User";
import _ from "lodash";
import {toast} from "react-toastify";
import {useAppStore} from "@store/app/app";

interface RegisterFormProps {
    onClose: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({onClose}: RegisterFormProps) => {
    const {t} = useTranslation<"default">("default");

    const setUser = useAppStore((state) => state.setUser);

    const [load, setLoad] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [errorCred, setErrorCred] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");

    /**
     * Handle user registration form submission
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setLoad(true);
        setErrorCred(null);

        const user: User = {
            email,
            password,
        };

        fetchUsers()
            .then((users: User[] | null) => {
                const existingUser: User | undefined = users?.find(
                    (u: User) => u.email === email && u.password === password
                );

                if (!existingUser) {
                    setErrorCred(t("error_cred"));
                    return null;
                }

                createUsers(existingUser);
                setUser(existingUser);
                toast.success(_.capitalize(t("connection")));
                onClose();
            })
            .catch((err: unknown) => {
                console.log(err)
                toast.error(t("something_went_wrong"));
            })
            .finally(() => {
                setLoad(false);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 hover:text-gray-600 cursor-pointer text-red-600"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-6 capitalize">
                    {t("connection")}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        placeholder={t("email")}
                        value={email}
                        onValueChange={setEmail}
                        required
                    />
                    <p className="text-red-600">{_.capitalize(errorCred || "")}</p>
                    <Input
                        type="password"
                        placeholder={t("password")}
                        value={password}
                        onValueChange={setPassword}
                        required
                        minLength={5}
                    />
                    <Button
                        type="submit"
                        className="bg-blue-500 text-white"
                        disabled={load}
                    >
                        {t("connection")}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
