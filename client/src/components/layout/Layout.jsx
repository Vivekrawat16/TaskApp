import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    if (isAuthPage) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {children}
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="mx-auto max-w-5xl">
                    {children}
                </div>
            </main>
        </div>
    );
};
