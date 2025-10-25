import api from "@/config/axiosConfig";
import type {
  LoginCredentials,
  SignUpCredentials,
} from "@/config/frontend_schema/auth";

export const signUp = async (credentials: SignUpCredentials): Promise<void> => {
  try {
    await api.post("/auth/register", credentials);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signIn = async (credentials: LoginCredentials): Promise<void> => {
  try {
    await api.post("/auth/login", credentials);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
