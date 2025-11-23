import { registerModal } from "@/core/store/modal";

interface Props {
    payload: { date: Date };
    resolver: (v: any) => void;
    onClose?: () => void;
    close: () => void;
}

function CreateHabitModal({ payload, resolver, close }: Props) {
    const confirm = () => {
        resolver({ success: true });
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-[400px]">
                <h2 className="text-lg font-bold">Create habit</h2>
                <p className="text-sm opacity-80">
                    Selected date: {payload.date.toString()}
                </p>

                <button
                    onClick={confirm}
                    className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

registerModal("CREATE_HABIT", CreateHabitModal);