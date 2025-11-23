import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
    currentMonth: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onMonthClick: () => void;
    onYearClick: () => void;
    showMonthPicker: boolean;
    showYearPicker: boolean;
}

export function CalendarHeader({
    currentMonth,
    onPrevMonth,
    onNextMonth,
    onMonthClick,
    onYearClick,
    showMonthPicker,
    showYearPicker
}: CalendarHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6 relative">
            <button
                onClick={onPrevMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-300"
                aria-label="Previous month"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 relative">
                <div className="relative">
                    <button
                        onClick={onMonthClick}
                        className={`px-3 py-2 text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                            showMonthPicker ? 'bg-gray-100 dark:bg-gray-700' : ''
                        }`}
                    >
                        {format(currentMonth, "MMMM")}
                    </button>
                </div>
                
                <div className="relative">
                    <button
                        onClick={onYearClick}
                        className={`px-3 py-2 text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                            showYearPicker ? 'bg-gray-100 dark:bg-gray-700' : ''
                        }`}
                    >
                        {format(currentMonth, "yyyy")}
                    </button>
                </div>
            </div>
            
            <button
                onClick={onNextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-300"
                aria-label="Next month"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}