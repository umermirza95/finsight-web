import { ICategory } from "../interface/ICategory";
import { ITransaction } from "../interface/ITransaction";
import { GET, POST } from "../utils/data-fetcher";
import { monthNamesShort } from "../utils/helpers";

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
    return data.transactions.map((transaction: any) => {
        transaction.date = new Date(transaction.date)
        return transaction
    }) as ITransaction[]
}

export function groupTransactionsByMonths(transactions: ITransaction[]): Map<string, ITransaction[]> {
    const group = new Map<string, ITransaction[]>()
    transactions.forEach(transaction => {
        const monthName = monthNamesShort[transaction.date.getMonth()]
        if (!group.has(monthName)) {
            group.set(monthName, [])
        }
        group.get(monthName)?.push(transaction)
    })
    return group
}

export async function getIncomeAndExpenseGroupedByMonth(year: number) {
    const from = new Date(year, 0, 1)
    const to = new Date(year, 12, 0)
    const transactions = await fetchTransactions(from, to);
    const group = groupTransactionsByMonths(transactions);
    const data: any[][] = []
    Array.from(group.keys()).forEach(month => {
        const row: any[] = []
        row.push(month);
        const totalIncome = group.get(month)
            ?.filter(transaction => transaction.type === 'income')
            .reduce((sum, transaction) => transaction.amount + sum, 0);
        const totalExpense = group.get(month)
            ?.filter(transaction => transaction.type === 'expense')
            .reduce((sum, transaction) => transaction.amount + sum, 0);
        row.push(totalIncome)
        row.push(totalExpense)
        data.unshift(row)
    })
    data.unshift([
        'Months',
        'Income',
        'Expense'
    ])
    return data
}