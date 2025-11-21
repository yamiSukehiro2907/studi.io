import api from "@/config/axiosConfig";
import type {ApiResponse} from "@/api/ApiResponse.ts";

export const sendEmailOTPVerification = async (
    email: string
): Promise<void> => {
    try {
        await api.post("/otp/send-otp", {email: email});
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const verifyOTP = async (
    email: string,
    otp: string
): Promise<object> => {
    try {
        const response: ApiResponse = await api.post("/otp/verify-otp", {
            email,
            otp,
        });
        return response.data.success;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
