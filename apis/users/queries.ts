import { useMutation, useQuery } from "@tanstack/react-query";
import { createPerson, deletePerson, getPersonById, updatePerson, UserType } from "./apis";

export const useCreatePerson = () => {
    return useMutation({
        mutationFn: ({ userData, token }: { userData: Partial<UserType>; token?: string }) =>
            createPerson({ userData, token }),
    });
};

export const useUpdatePerson = () => {
    return useMutation({
        mutationFn: ({ uid, userData, token }: { uid: string; userData: Partial<UserType>; token?: string }) =>
            updatePerson({ uid, userData, token }),
    });
};

export const useGetPersonById = (uid: string) => {
    return useQuery({
        queryKey: ["person", uid],
        queryFn: () => getPersonById(uid),
        enabled: !!uid,
    });
};

export const useDeletePerson = () => {
    return useMutation({
        mutationFn: ({ uid, token }: { uid: string; token?: string }) =>
            deletePerson({ uid, token }),
    });
};
