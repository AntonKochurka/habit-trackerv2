import { CalendarIcon } from "lucide-react";

interface CalendarActionsProps {
    onToday: () => void;
    onGoToSelected: () => void;
}

export function CalendarActions({ onToday, onGoToSelected }: CalendarActionsProps) {
    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={onToday}
                className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
                Today
            </button>
            <button
                onClick={onGoToSelected}
                className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-1"
            >
                <CalendarIcon className="w-4 h-4" />
                To Selected
            </button>
        </div>
    );
}