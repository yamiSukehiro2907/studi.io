import axios from 'axios';

// Define the base URL for the resource API
const API_BASE_URL = '/api/resources';

// Define the Resource interface
export interface Resource {
  _id: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Define a type for creating a new resource (without _id, createdAt, updatedAt)
export type CreateResourceDto = Omit<Resource, '_id' | 'createdAt' | 'updatedAt'>;

// Define a type for updating a resource (all fields optional, but _id is required implicitly)
export type UpdateResourceDto = Partial<CreateResourceDto>;

// Define a generic API response interface
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Fetches all resources from the API.
 * @returns A promise that resolves to an ApiResponse containing an array of resources.
 */
export const getResources = async (): Promise<ApiResponse<Resource[]>> => {
  try {
    const response = await axios.get<ApiResponse<Resource[]>>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return { success: false, message: 'Failed to fetch resources', error: (error as Error).message };
  }
};

/**
 * Fetches a single resource by its ID.
 * @param id The ID of the resource to fetch.
 * @returns A promise that resolves to an ApiResponse containing the resource.
 */
export const getResourceById = async (id: string): Promise<ApiResponse<Resource>> => {
  try {
    const response = await axios.get<ApiResponse<Resource>>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching resource with ID ${id}:`, error);
    return { success: false, message: `Failed to fetch resource with ID ${id}`, error: (error as Error).message };
  }
};

/**
 * Creates a new resource.
 * @param resourceData The data for the new resource.
 * @returns A promise that resolves to an ApiResponse containing the created resource.
 */
export const createResource = async (resourceData: CreateResourceDto): Promise<ApiResponse<Resource>> => {
  try {
    const response = await axios.post<ApiResponse<Resource>>(API_BASE_URL, resourceData);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    return { success: false, message: 'Failed to create resource', error: (error as Error).message };
  }
};

/**
 * Updates an existing resource.
 * @param id The ID of the resource to update.
 * @param resourceData The data to update the resource with.
 * @returns A promise that resolves to an ApiResponse containing the updated resource.
 */
export const updateResource = async (id: string, resourceData: UpdateResourceDto): Promise<ApiResponse<Resource>> => {
  try {
    const response = await axios.put<ApiResponse<Resource>>(`${API_BASE_URL}/${id}`, resourceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating resource with ID ${id}:`, error);
    return { success: false, message: `Failed to update resource with ID ${id}`, error: (error as Error).message };
  }
};

/**
 * Deletes a resource by its ID.
 * @param id The ID of the resource to delete.
 * @returns A promise that resolves to an ApiResponse confirming the deletion.
 */
export const deleteResource = async (id: string): Promise<ApiResponse<{}>> => {
  try {
    const response = await axios.delete<ApiResponse<{}>>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting resource with ID ${id}:`, error);
    return { success: false, message: `Failed to delete resource with ID ${id}`, error: (error as Error).message };
  }
};
