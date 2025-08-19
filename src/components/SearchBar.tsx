import {FC} from "react";
import {FaSearch, FaTimes} from "react-icons/fa";

interface SearchBarProps {
    value: string;
    label?: string;
    onChange: (value: string) => void;
    className?: string;
}

const SearchBar: FC<SearchBarProps> = ({value, onChange, label, className = ""}: SearchBarProps) => {
    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={label}
                className="w-full shadow py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>

            {value.length > 0 && (
                <FaTimes
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={() => onChange("")}
                />
            )}
        </div>
    );
}

export default SearchBar;
