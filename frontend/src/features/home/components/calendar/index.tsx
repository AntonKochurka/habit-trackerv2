import { useCalendarStore } from "@/core/store/calendar.store";
import { addMonths, eachDayOfInterval, endOfMonth, startOfMonth, subMonths } from "date-fns";
import { useState } from "react";
import { CalendarHeader } from "./calendar_header";
import { DatePickers } from "./date_pickers";
import { CalendarActions } from "./calendar_actions";
import { CalendarGrid } from "./calendar_grid";
import { SelectedDate } from "./selected_date";

export default function Calendar() {
    const { selectedDate, setDate, resetToday } = useCalendarStore();
    const [currentMonth, setCurrentMonth] = useState(selectedDate);
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);

    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const firstDayOfMonth = start.getDay();

    const handleSelect = (day: Date) => {
        setDate(day);
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
        setShowMonthPicker(false);
        setShowYearPicker(false);
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
        setShowMonthPicker(false);
        setShowYearPicker(false);
    };

    const goToSelectedDate = () => {
        setCurrentMonth(selectedDate);
        setShowMonthPicker(false);
        setShowYearPicker(false);
    };

    const handleMonthSelect = (month: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(month);
        setCurrentMonth(newDate);
        setShowMonthPicker(false);
    };

    const handleYearSelect = (year: number) => {
        const newDate = new Date(currentMonth);
        newDate.setFullYear(year);
        setCurrentMonth(newDate);
        setShowYearPicker(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-full relative">
            <CalendarHeader
                currentMonth={currentMonth}
                onPrevMonth={prevMonth}
                onNextMonth={nextMonth}
                onMonthClick={() => setShowMonthPicker(!showMonthPicker)}
                onYearClick={() => setShowYearPicker(!showYearPicker)}
                showMonthPicker={showMonthPicker}
                showYearPicker={showYearPicker}
            />

            <DatePickers
                showMonthPicker={showMonthPicker}
                showYearPicker={showYearPicker}
                onMonthSelect={handleMonthSelect}
                onYearSelect={handleYearSelect}
            />

            <CalendarActions
                onToday={resetToday}
                onGoToSelected={goToSelectedDate}
            />

            <CalendarGrid
                days={days}
                selectedDate={selectedDate}
                firstDayOfMonth={firstDayOfMonth}
                onSelectDate={handleSelect}
            />

            <SelectedDate selectedDate={selectedDate} />
        </div>
    );
}