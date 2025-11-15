interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string | null;
};

export interface UserModel extends BaseModel {
    username: string;
}