import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="w-full flex justify-between items-center px-8 py-4 bg-black text-white shadow-md">
            <div className="text-2xl font-extrabold tracking-tight">
                Habit<span className="text-indigo-500">Track</span>
            </div>
            <nav className="flex gap-6 items-center">
                <Link to="/about" className="hover:text-indigo-400 transition-colors">
                    About
                </Link>
                <Link to="/auth/signin" className="hover:text-indigo-400 transition-colors">
                    Sign In
                </Link>
                <Link
                    to="/auth/signup"
                    className="px-4 py-2 rounded-md bg-linear-to-r from-indigo-500 to-purple-500 text-black font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all"
                >
                    Sign Up
                </Link>
            </nav>
        </header>
    );
}
