import { ICategory } from "../interface/ICategory";
import { ITransaction } from "../interface/ITransaction";
import { GET, POST } from "../utils/data-fetcher";

export async function getCategories(): Promise<ICategory[]> {
    const data = await GET('/category')
    return data.categories as ICategory[]
}

export async function createTransaction(payload: any): Promise<ITransaction> {
    const data = await POST('/transaction', payload)
    return data.transaction;
}