import { ICategory } from "../interface/ICategory";
import { ITransaction } from "../interface/ITransaction";
import { ITransactionsFilter } from "../pages/TransactionPage";
import { DELETE, GET, POST, PUT } from "../utils/data-fetcher";
import { getYearlySpan } from "../utils/helpers";

export async function getCategories(): Promise<ICategory[]> {
    const data = await GET('/category')
    return data.categories as ICategory[]
}

export async function createTransaction(payload: any): Promise<ITransaction> {
    payload.subCategoryId = !payload.subCategoryId ? undefined : payload.subCategoryId
    const data = await POST('/transactions', payload)
    return data.transaction;
}

export async function fetchTransactions(filters?: ITransactionsFilter): Promise<ITransaction[]> {
    let url = `/transactions?`
    if (!!filters?.startDate) {
        url = url + `from=${filters.startDate.toISOString().split('T')[0]}`
    }
    if (!!filters?.endDate) {
        url = url + `&to=${filters.endDate.toISOString().split('T')[0]}`
    }
    if (!!filters?.categoryId) {
        url = url + `&categoryId=${filters.categoryId}`
    }
    if (!!filters?.type) {
        url = url + `&type=${filters.type}`
    }
    const data = await GET(url)
    return data.transactions.map((transaction: any) => {
        transaction.date = new Date(transaction.date)
        return transaction
    }) as ITransaction[]
}

export async function fetchTransactionById(id: string): Promise<ITransaction> {
    const data = await GET(`/transactions/${id}`)
    return data.transaction as ITransaction;
}

export async function fetchYearlyTransactions(year: number): Promise<ITransaction[]> {
    const { from, to } = getYearlySpan(year)
    return await fetchTransactions({ startDate: from, endDate: to });
}

export async function deleteTransaction(id: string) {
    return await DELETE(`/transactions/${id}`);
}

