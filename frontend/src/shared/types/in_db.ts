interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string | null;
}

export interface UserModel extends BaseModel {
    username: string;
}

export interface HabitSettings {
}

export type HabitType = "default" | "counter" | "timer";

export interface HabitModel extends BaseModel {
    title: string;
    description: string;
    type: HabitType;
    goal_value: number;
    active_on: number[];
    settings: HabitSettings;
}

export interface EntryMetadata {
}

export interface EntryModel extends BaseModel {
    habit_id: number;
    date: string;
    progress_value: number;
    completed: boolean;
    entry_metadata: EntryMetadata;
}
