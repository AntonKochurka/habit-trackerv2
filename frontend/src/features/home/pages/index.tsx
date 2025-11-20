import Calendar from "../components/calendar";
import UserCard from "../components/user_card";

export default function HomeIndexPage() {
    return (
        <div className="px-4 mt-6 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">

                <UserCard />

                <hr className="border-gray-300 dark:border-gray-700" />

                <Calendar />

            </div>
        </div>
    );
}
