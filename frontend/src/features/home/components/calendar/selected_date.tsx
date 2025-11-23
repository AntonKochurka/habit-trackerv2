import { format } from "date-fns";

interface SelectedDateProps {
    selectedDate: Date;
}

export function SelectedDate({ selectedDate }: SelectedDateProps) {
    return (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Selected date</p>
            <p className="font-semibold text-gray-900 dark:text-white">
                {format(selectedDate, "EEEE, MMMM do, yyyy")}
            </p>
        </div>
    );
}