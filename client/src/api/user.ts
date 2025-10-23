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
