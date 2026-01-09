import { apiClient } from "@/utils/apiCLient";
import { PERSON } from "./endpoints";

export type UserType = {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
    emailVerified: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export const createUser = async (userData: Partial<UserType>) => {
    const response = await apiClient.post(PERSON, userData);
    return response.data;
};

export const updateUser = async (uid: string, userData: Partial<UserType>) => {
    const response = await apiClient.put(`${PERSON}/${uid}`, userData);
    return response.data;
};

export const getUserById = async (uid: string) => {
    const response = await apiClient.get(`${PERSON}/${uid}`);
    return response.data;
};

export const deleteUser = async (uid: string) => {
    const response = await apiClient.delete(`${PERSON}/${uid}`);
    return response.data;
};
