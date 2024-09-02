import { ICategory } from "../interface/ICategory";
import { GET } from "../utils/data-fetcher";

export async function getCategories(): Promise<ICategory[]> {
    const data = await GET('/category')
    return data.categories as ICategory[]
}