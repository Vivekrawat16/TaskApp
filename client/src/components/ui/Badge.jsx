import { cn } from "../../utils/cn";

export const Badge = ({ variant = "default", className, children }) => {
    const variants = {
        default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
        primary: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning-700",
        danger: "bg-danger/10 text-danger",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
