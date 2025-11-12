import api from "@/config/axiosConfig";
import type { Resource } from "@/config/schema/Resource";

export const createResource = async (
  roomId: string,
  sectionId: string,
  data: { title: string; link: string }
): Promise<Resource> => {
  try {
    const response = await api.post(
      `/rooms/${roomId}/sections/${sectionId}/create`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateResource = async (
  roomId: string,
  sectionId: string,
  resourceId: string,
  data: { title: string; link: string }
): Promise<Resource> => {
  try {
    const response = await api.put(
      `/rooms/${roomId}/sections/${sectionId}/${resourceId}`,
      data,
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
    await api.delete(
      `/rooms/${roomId}/sections/${sectionId}/${resourceId}`,
      { withCredentials: true }
    );
  } catch (error) {
    throw error;
  }
};
