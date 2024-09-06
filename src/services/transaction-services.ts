import { ITransaction } from "../interface/ITransaction"
import { monthNamesShort } from "../utils/helpers"


function groupTransactionsByMonths(transactions: ITransaction[]): Map<string, ITransaction[]> {
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

export function getMonthlyAverageIncomeAndExpense(transactions: ITransaction[]): { avergaeIncome: number, avergaeExpense: number } {
    let totalIncome = 0;
    let totalExpense = 0;
    const currentMonth = (new Date()).getMonth()
    const monthsPassed = currentMonth <= 1 ? 1 : currentMonth - 1;
    let validTransactions = transactions;
    if (currentMonth > 0) {
        validTransactions = transactions.filter(t => t.date.getMonth() < currentMonth)
    }
    totalIncome = validTransactions.filter(t => t.type === 'income').reduce((sum, t) => t.amount + sum, 0);
    totalExpense = validTransactions.filter(t => t.type === 'expense').reduce((sum, t) => t.amount + sum, 0);
    const avergaeIncome = parseFloat((totalIncome / monthsPassed).toFixed(2))
    const avergaeExpense = parseFloat((totalExpense / monthsPassed).toFixed(2))
    return {
        avergaeExpense,
        avergaeIncome
    }
}


export function getIncomeAndExpenseGroupedByMonth(transactions: ITransaction[]): any[][] {
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