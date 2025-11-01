import api from "@/config/axiosConfig";
import type { Resource } from "@/config/schema/Resource";

export const createResource = async (
  formData: FormData,
  roomId: string,
  sectionId: string
): Promise<Resource> => {
  try {
    const response = await api.post(
      `/rooms/${roomId}/sections/${sectionId}/create`,
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

export const updateResource = async (
  formData: FormData,
  roomId: string,
  sectionId: string,
  resourceId: string
): Promise<Resource> => {
  try {
    const response = await api.put(
      `/rooms/${roomId}/sections/${sectionId}/${resourceId}/update`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteResource = async (
  roomId: string,
  sectionId: string,
  resourceId: string
): Promise<void> => {
  try {
    await api.delete(`/rooms/${roomId}/sections/${sectionId}/${resourceId}/`, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};
