import api from "@/config/axiosConfig.ts";
import type { Section } from "@/config/schema/Section";

export const createSection = async (
  formData: FormData,
  roomId: string
): Promise<Section> => {
  try {
    const response = await api.post(
      `/rooms/${roomId}/sections/create`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSection = async (
  formData: FormData,
  roomId: string,
  sectionId: string
): Promise<Section> => {
  try {
    const response = await api.put(
      `/rooms/${roomId}/sections/${sectionId}/update`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSection = async (
  roomId: string,
  sectionId: string
): Promise<void> => {
  try {
    await api.delete(`/rooms/${roomId}/sections/${sectionId}/update`, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};
