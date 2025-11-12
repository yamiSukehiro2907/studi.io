import api from "@/config/axiosConfig";
import type { StudyRoom } from "@/config/schema/StudyRoom";

export const createStudyRoom = async (
  roomName: string,
  description: string
): Promise<StudyRoom> => {
  try {
    const response = await api.post(
      "/rooms/create",
      { name: roomName, description: description },
      { withCredentials: true }
    );
    return response.data.room;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserRooms = async (): Promise<StudyRoom[]> => {
  try {
    const response = await api.get("/rooms/", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const joinPublicRoom = async (roomId: string): Promise<StudyRoom> => {
  try {
    const response = await api.post(`/rooms/${roomId}/join`, {
      withCredentials: true,
    });

    if (response.data?.message === "You are already a member") {
      throw new Error("You are already a member");
    }
    return response.data.room;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPublicRooms = async (term: string): Promise<StudyRoom[]> => {
  try {
    const response = await api.get(`/rooms/public?term=${term}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRoomInfo = async (
  formData: FormData,
  roomId: string
): Promise<StudyRoom> => {
  try {
    const response = await api.put(`/rooms/${roomId}/update`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRoomDB = async (roomId: string): Promise<void> => {
  try {
    await api.delete(`/rooms/${roomId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
