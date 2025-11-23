import { useCalendarStore } from "@/core/store/calendar.store";
import Calendar from "../components/calendar";
import UserCard from "../components/user_card";
import { useModalStore } from "@/core/store/modal";

export default function HomeIndexPage() {
    const { selectedDate } = useCalendarStore();
    const { openModal } = useModalStore();

    return (
        <div className="px-4 mt-6 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">

                <UserCard />

                <hr className="border-gray-300 dark:border-gray-700" />

                <Calendar />

                <button
                    onClick={() => {
                        console.log("clicked")
                        
                        openModal("CREATE_HABIT", { date:  selectedDate })

                    }
                    }
                >
                    Create Habit
                </button>

            </div>
        </div>
    );
}
