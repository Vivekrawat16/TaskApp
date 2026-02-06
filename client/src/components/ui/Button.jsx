import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export const Button = ({
    className,
    variant = "primary",
    size = "md",
    isLoading,
    children,
    ...props
}) => {
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
        secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm",
        danger: "bg-danger text-white hover:bg-red-600 shadow-sm",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "p-2",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};
