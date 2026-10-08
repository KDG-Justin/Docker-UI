import { useQuery } from "@tanstack/react-query";
import type { ContainerItem } from "../model/Container";
import { getContainers } from "../services/ContainerService";



export function useContainers() {
    const { data: containers, isError, isLoading } = useQuery<ContainerItem[]>({
        queryKey: ["containers"],
        queryFn: getContainers,
        refetchInterval: 3000,
    });

    return { containers, isError, isLoading };
}