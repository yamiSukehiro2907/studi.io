import api from "@/config/axiosConfig";
import type { Message } from "@/config/schema/Message";

export const getMessagesOfRoom = async (roomId: string): Promise<Message[]> => {
  const response = await api.get(`/messages/${roomId}`, {
    withCredentials: true,
  });
  return response.data.messages;
};
