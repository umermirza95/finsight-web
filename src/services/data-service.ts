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

export async function fetchTransactions(from: Date, to: Date): Promise<ITransaction[]> {
    const data = await GET(`/transactions?from=${from.toISOString().replaceAll(':', '%3A')}&to=${to.toISOString().replaceAll(':', '%3A')}`)
    return data.transactions as ITransaction[]
}