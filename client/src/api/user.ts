import api from "@/config/axiosConfig";
import type { User } from "@/config/schema/User";

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get("/user/profile", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (formData: FormData): Promise<any> => {
  try {
    const response = await api.post("/user/update", formData, {
      withCredentials: true,
    });
    return response.data;
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
    await api.post("/user/change-password", {
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
    await api.post("/user/change-password-with-current", {
      currentPassword: currentPassword,
      newPassword: newPassword,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
