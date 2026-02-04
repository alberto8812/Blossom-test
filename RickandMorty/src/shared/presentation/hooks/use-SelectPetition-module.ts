import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { BasePaginatedRepository } from "../../domain/base/base-repository.interface";

export const useSelectPetitionModule = <T>(
    queryKey: string,
    actions: Pick<BasePaginatedRepository<T>, 'findAll'>
) => {
    const { data, isLoading } = useQuery({
        queryKey: [queryKey],
        queryFn: () => actions.findAll(),
        placeholderData: keepPreviousData,
    });
    return {
        data,
        isLoading,
    };
}
