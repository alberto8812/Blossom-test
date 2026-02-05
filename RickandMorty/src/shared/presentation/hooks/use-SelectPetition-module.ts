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
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: fetcher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return mutation;
};

