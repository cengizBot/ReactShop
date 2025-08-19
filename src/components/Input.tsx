import {FC, InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

const Input: FC<InputProps> = ({label, value, onValueChange, ...props}: InputProps) => {
    return (
        <div className="flex flex-col">
            {label && <label className="mb-1 text-gray-700 font-medium">{label}</label>}
            <input
                value={value}
                onChange={(e) => onValueChange?.(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                {...props}
            />
        </div>
    );
};

export default Input;
