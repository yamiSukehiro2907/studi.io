import api from "@/config/axiosConfig";

export const sendEmailOTPVerification = async (
  email: string
): Promise<void> => {
  try {
    await api.post("/otp/send-email-otp", { email: email });
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
    const response = await api.post("/otp/verify-otp", {
      email,
      otp,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
