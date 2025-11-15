import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { ToastProvider } from "./toast";

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <ToastProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
            </ToastProvider>
        </div>
    );
}
