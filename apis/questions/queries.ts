import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, QuestionData } from "./apis";

export const useCreateQuestion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data, token }: { data: QuestionData; token?: string }) =>
            createQuestion({ data, token }),
        onSuccess: () => {
            // Invalidate questions query if we ever have a list of questions
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
    });
};
