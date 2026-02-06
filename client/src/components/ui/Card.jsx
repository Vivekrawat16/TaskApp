import { cn } from "../../utils/cn";

export const Card = ({ className, hover = false, children, ...props }) => {
    return (
        <div
            className={cn(
                "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6",
                hover && "transition-transform hover:-translate-y-1 hover:shadow-md duration-200",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
