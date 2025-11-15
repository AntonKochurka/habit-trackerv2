import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
