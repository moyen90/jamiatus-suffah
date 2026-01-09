import { apiClient } from "@/utils/apiCLient";
import { QUESTION } from "./endpoints";

export interface QuestionData {
    question: string;
    userUid: string;
    userName?: string;
    userEmail?: string;
}

export const createQuestion = async ({ data, token }: { data: QuestionData; token?: string }) => {
    try {
        const response = await apiClient.post(QUESTION, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error("Error creating question", error);
        throw error;
    }
};
