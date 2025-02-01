export interface ITransaction {
    id: string
    type: TransactionType,
    mode: string,
    amount: number,
    comment?: string
    categoryId: string,
    subCategoryId?: string,
    date: Date,
    currency?: string,
    baseAmount: number
}

export type TransactionType = "income" | "expense"
export type TransactionMode = "card" | "cash" | "online" | "transfer"
export enum SupportedCurrencies {
    PKR = "PKR",
    USD = "USD",
    AED = "AED",
    EUR = "EUR"
}