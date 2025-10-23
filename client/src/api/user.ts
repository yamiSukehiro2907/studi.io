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
