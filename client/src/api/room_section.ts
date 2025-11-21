/* eslint-disable no-useless-catch */
import api from "@/config/axiosConfig";
import type {Section} from "@/config/schema/Section";

export const createSection = async (
    roomId: string,
    title: string
): Promise<Section> => {
    try {
        const response = await api.post(
            `/rooms/${roomId}/sections/create`,
            {title},
            {withCredentials: true}
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSection = async (
    roomId: string,
    sectionId: string,
    title: string
): Promise<Section> => {
    try {
        const response = await api.put(
            `/rooms/${roomId}/sections/${sectionId}`,
            {title},
            {withCredentials: true}
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
        await api.delete(`/rooms/${roomId}/sections/${sectionId}`, {
            withCredentials: true,
        });
    } catch (error) {
        throw error;
    }
};
