import { useThemeStore } from "@/core/store";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-900 text-black dark:text-white border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-extrabold tracking-tight">
          Habit<span className="text-indigo-500">Track</span>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
          BETA
        </span>
      </div>
      
      <nav className="flex gap-2 items-center">
        <Link 
          to="/features" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Features
        </Link>
        <Link 
          to="/pricing" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Pricing
        </Link>
        <Link 
          to="/about" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          About
        </Link>
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
        
        <Link 
          to="/auth/signin" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/auth/signup"
          className="px-4 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-all shadow-sm"
        >
          Get Started
        </Link>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </nav>
    </header>
  );
}