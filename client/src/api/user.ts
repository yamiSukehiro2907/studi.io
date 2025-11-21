import api from "@/config/axiosConfig";
import type {User} from "@/config/schema/User";
import type {ApiResponse} from "@/api/ApiResponse.ts";

export const fetchCurrentUser = async (): Promise<User> => {
    try {
        const response: ApiResponse = await api.get("/user/profile", {withCredentials: true});
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUser = async (formData: FormData): Promise<User> => {
    try {
        const response: ApiResponse = await api.put("/user/update", formData, {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const changePassword = async (
    email: string,
    password: string
): Promise<void> => {
    try {
        await api.put("/user/change-password", {
            email: email,
            password: password,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const changePassword2 = async (
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    try {
        await api.put("/user/change-password-with-current", {
            currentPassword: currentPassword,
            newPassword: newPassword,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
