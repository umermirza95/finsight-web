import { getCategories } from "../services/data-service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories()
    })
    return {categories, isLoading};
};