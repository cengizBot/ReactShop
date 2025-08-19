import type {ButtonHTMLAttributes, FC, ReactNode} from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

const Button: FC<ButtonProps> = ({children, className, disabled, ...props}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={clsx(
                "px-4 py-2 font-semibold rounded transition-colors capitalize flex items-center justify-center gap-2 cursor-pointer",
                className,
                disabled && "!bg-gray-400 !text-gray-200 cursor-not-allowed"
            )}
            {...props}
        >
            {children}
            {disabled && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            )}
        </button>
    );
};


export default Button;
