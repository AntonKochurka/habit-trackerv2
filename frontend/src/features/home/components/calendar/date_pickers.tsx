interface DatePickersProps {
    showMonthPicker: boolean;
    showYearPicker: boolean;
    onMonthSelect: (month: number) => void;
    onYearSelect: (year: number) => void;
}

export function DatePickers({ 
    showMonthPicker, 
    showYearPicker, 
    onMonthSelect, 
    onYearSelect
}: DatePickersProps) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const years = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);

    return (
        <>
            {showMonthPicker && (
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-20 w-48 p-3">
                    <div className="grid grid-cols-3 gap-1">
                        {months.map((month, index) => (
                            <button
                                key={month}
                                onClick={() => onMonthSelect(index)}
                                className="px-2 py-2 text-xs font-medium hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                            >
                                {month.slice(0, 3)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {showYearPicker && (
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-20 w-40 p-3 max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-1">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => onYearSelect(year)}
                                className="px-2 py-2 text-xs font-medium hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}