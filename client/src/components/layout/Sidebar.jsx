import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CheckSquare, ListTodo, LogOut } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export const Sidebar = () => {
    const location = useLocation();
    const { logout, user } = useContext(AuthContext);

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/",
            active: location.pathname === "/",
        },
        {
            label: "My Tasks",
            icon: ListTodo,
            href: "/tasks", // Future route
            active: location.pathname === "/tasks",
        },
        {
            label: "Completed",
            icon: CheckSquare,
            href: "/completed", // Future route
            active: location.pathname === "/completed",
        },
    ];

    return (
        <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-16 items-center border-b border-slate-200 px-6 dark:border-slate-800">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                        <CheckSquare className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        TaskApp
                    </span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            to={route.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                route.active
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                            )}
                        >
                            <route.icon className="h-5 w-5" />
                            {route.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                            {user?.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-danger dark:hover:bg-slate-800"
                        title="Logout"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
