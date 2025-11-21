import api from "./axiosConfig";
import type {User} from "./schema/User";

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export const jsonApiCall = {
    get: async <T>(url: string): Promise<T> => {
        const response = await api.get(url);
        return response.data;
    },

    post: async <T>(url: string, data: object): Promise<T> => {
        const response = await api.post(url, data);
        return response.data;
    },

    put: async <T>(url: string, data: object): Promise<T> => {
        const response = await api.put(url, data);
        return response.data;
    },

    delete: async <T>(url: string): Promise<T> => {
        const response = await api.delete(url);
        return response.data;
    },
};

export const fileUpload = {
    uploadSingle: async <T>(
        url: string,
        file: File,
        fieldName: string = "file",
        additionalData?: Record<string, string>
    ): Promise<T> => {
        const formData = new FormData();
        formData.append(fieldName, file);
        if (additionalData) {
            Object.entries(additionalData).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        const response = await api.post(url, formData);
        return response.data;
    },

    uploadMultiple: async <T>(
        url: string,
        files: File[],
        fieldName: string = "files",
        additionalData?: Record<string, string>
    ): Promise<T> => {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append(fieldName, file);
        });

        if (additionalData) {
            Object.entries(additionalData).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        const response = await api.post(url, formData);
        return response.data;
    },

    updateProfile: async (profileData: {
        name?: string;
        bio?: string;
        username?: string;
        profileImage?: File;
    }): Promise<User> => {
        const formData = new FormData();

        if (profileData.name) formData.append("name", profileData.name);
        if (profileData.bio) formData.append("bio", profileData.bio);
        if (profileData.username) formData.append("username", profileData.username);

        if (profileData.profileImage) {
            formData.append("profileImage", profileData.profileImage);
        }

        const response = await api.put("/users/editProfile", formData);
        return response.data;
    },
};

export const formDataCall = {
    post: async <T>(url: string, data: Record<string, string>): Promise<T> => {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            params.append(key, value);
        });

        const response = await api.post(url, params);
        return response.data;
    },

    put: async <T>(url: string, data: Record<string, string>): Promise<T> => {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            params.append(key, value);
        });

        const response = await api.put(url, params);
        return response.data;
    },
};

export const binaryDataCall = {
    uploadBinary: async <T>(
        url: string,
        data: ArrayBuffer | Blob
    ): Promise<T> => {
        const response = await api.post(url, data);
        return response.data;
    },

    downloadBinary: async (url: string): Promise<Blob> => {
        const response = await api.get(url, {
            responseType: "blob",
        });
        return response.data;
    },
};

export const userApi = {
    getProfile: () => jsonApiCall.get<User>("/users/profile"),

    getPublicProfile: (username: string) =>
        jsonApiCall.get<User>(`/users/profile/${username}`),

    editProfile: async (formData: FormData) => {
        const res = await api.put("/users/editProfile", formData);
        return res.data;
    },

    editProfileAlt: (profileData: {
        name?: string;
        bio?: string;
        username?: string;
        profileImage?: File;
    }) => fileUpload.updateProfile(profileData),
};

export const withErrorHandling = async <T>(
    apiCall: () => Promise<T>,
    customErrorHandler?: (error: unknown) => void
): Promise<T | null> => {
    try {
        return await apiCall();
    } catch (error: any) {
        if (customErrorHandler) {
            customErrorHandler(error);
        } else {
            if (error.response?.data?.message) {
                console.error("API Error:", error.response.data.message);
            } else {
                console.error("API Error:", error.message);
            }
        }
        return null;
    }
};
