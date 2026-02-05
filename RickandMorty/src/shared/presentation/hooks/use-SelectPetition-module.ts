import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
