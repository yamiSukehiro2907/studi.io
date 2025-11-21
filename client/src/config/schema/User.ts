export interface User {
    _id: string;
    name: string;
    email: string;
    username: string;
    bio?: string;
    verified: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    profileImage?: string;
}
