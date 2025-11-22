import { create } from "zustand";

interface CalendarState {
    selectedDate: Date;

    setDate: (date: Date) => void;
    resetToday: () => void;

    nextDay: () => void;
    prevDay: () => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
    selectedDate: new Date(),

    setDate: (date) => set({ selectedDate: date }),

    resetToday: () => set({ selectedDate: new Date() }),

    nextDay: () => {
        const cur = get().selectedDate;
        const next = new Date(cur);
        next.setDate(cur.getDate() + 1);
        set({ selectedDate: next });
    },

    prevDay: () => {
        const cur = get().selectedDate;
        const prev = new Date(cur);
        prev.setDate(cur.getDate() - 1);
        set({ selectedDate: prev });
    }
}));
