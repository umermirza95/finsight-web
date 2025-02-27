import { ICategory } from "../interface/ICategory";
import { ITransaction } from "../interface/ITransaction";
import { GET, POST } from "../utils/data-fetcher";
import { getYearlySpan } from "../utils/helpers";

export async function getCategories(): Promise<ICategory[]> {
    const data = await GET('/category')
    return data as ICategory[]
}

export async function createTransaction(payload: any): Promise<ITransaction> {
    payload.subCategoryId = !payload.subCategoryId ? undefined : payload.subCategoryId
    const data = await POST('/transaction', payload)
    return data.transaction;
}

export async function fetchTransactions(from: Date, to: Date): Promise<ITransaction[]> {
    const data = await GET(`/transaction?from=${from.toISOString()}&to=${to.toISOString()}`)
    return data.map((transaction: any) => {
        transaction.date = new Date(transaction.date)
        return transaction
    }) as ITransaction[]
}

export async function fetchYearlyTransactions(year: number): Promise<ITransaction[]> {
    const { from, to } = getYearlySpan(year)
    const data = await GET(`/transaction?from=${from.toISOString()}&to=${to.toISOString()}`)
    return data.map((transaction: any) => {
        transaction.date = new Date(transaction.date)
        return transaction
    }) as ITransaction[]
}

