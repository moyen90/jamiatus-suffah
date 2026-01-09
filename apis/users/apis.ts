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

export const createPerson = async ({ userData, token }: { userData: Partial<UserType>; token?: string }) => {
    const response = await apiClient.post(PERSON, userData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

export const updatePerson = async ({ uid, userData, token }: { uid: string; userData: Partial<UserType>; token?: string }) => {
    const response = await apiClient.put(`${PERSON}/${uid}`, userData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};

export const getPersonById = async (uid: string) => {
    const response = await apiClient.get(`${PERSON}/${uid}`);
    return response.data;
};

export const deletePerson = async ({ uid, token }: { uid: string; token?: string }) => {
    const response = await apiClient.delete(`${PERSON}/${uid}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
};
