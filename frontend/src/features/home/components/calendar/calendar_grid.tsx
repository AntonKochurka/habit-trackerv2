import { format } from "date-fns";

interface CalendarGridProps {
    days: Date[];
    selectedDate: Date;
    firstDayOfMonth: number;
    onSelectDate: (date: Date) => void;
}

export function CalendarGrid({ days, selectedDate, firstDayOfMonth, onSelectDate }: CalendarGridProps) {
    return (
        <>
            <div className="grid grid-cols-7 gap-1 mb-3">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "St"].map((day) => (
                    <div 
                        key={day} 
                        className="h-8 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-10" />
                ))}
                
                {days.map((day) => {
                    const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                    const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                    
                    return (
                        <button
                            key={day.toISOString()}
                            type="button"
                            onClick={() => onSelectDate(day)}
                            className={`
                                h-10 rounded-lg transition-all duration-200 font-medium
                                relative group
                                ${isSelected
                                    ? "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : isToday
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                                }
                            `}
                        >
                            {day.getDate()}
                            
                            {isToday && !isSelected && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </>
    );
}