import {FC, useEffect, useRef, useState} from "react";
import i18n from "@i18n/i18n";

interface LanguageSwitcherProps {
    languages?: { code: "en" | "fr"; label: string }[];
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
                                                         languages = [
                                                             {code: "en", label: "English"},
                                                             {code: "fr", label: "Français"},
                                                         ],
                                                     }: LanguageSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeLanguage = (lang: "en" | "fr"): void => {
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="bg-white text-black px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
            >
                {i18n.language.toUpperCase()}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`block w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                                i18n.language === lang.code ? "font-bold" : ""
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
