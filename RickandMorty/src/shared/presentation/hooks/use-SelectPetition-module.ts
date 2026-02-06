import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFindAll = <T>(
    queryKey: unknown[],
    fetcher: () => Promise<T[]>
) => {
    return useQuery({
        queryKey,
        queryFn: fetcher,
        placeholderData: keepPreviousData,
    });
};

export const useFindById = <T>(
    queryKey: unknown[],
    fetcher: () => Promise<T>,
    enabled = true
) => {
    return useQuery({
        queryKey,
        queryFn: fetcher,
        enabled,
    });
};

export const useSaveData = <T>(
    queryKey: unknown[],
    fetcher: (data: T) => Promise<void>
) => {
    console.log("useSaveData called with queryKey:", queryKey);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return mutation;
};

export const useDeleteData = <T>(
    queryKey: unknown[],
    fetcher: (id: string | number) => Promise<void>
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return mutation;
}

