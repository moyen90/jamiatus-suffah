import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUserById, updateUser, UserType } from "./apis";

export const useCreateUser = () => {
    return useMutation({
        mutationFn: createUser,
    });
};

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: ({ uid, userData }: { uid: string; userData: Partial<UserType> }) =>
            updateUser(uid, userData),
    });
};

export const useGetUserById = (uid: string) => {
    return useQuery({
        queryKey: ["user", uid],
        queryFn: () => getUserById(uid),
        enabled: !!uid,
    });
};

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: deleteUser,
    });
};
