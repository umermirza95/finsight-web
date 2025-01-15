import { ICategory } from "../interface/ICategory";

export function getCategoryById(categories: ICategory[], id: string): ICategory | undefined {
    return categories.find(c=> c.id === id);
}