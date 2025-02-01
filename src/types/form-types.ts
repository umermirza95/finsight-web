import { SupportedCurrencies, TransactionMode, TransactionType } from "../interface/ITransaction"

export type NewTransactionForm = {
    type: TransactionType,
    amount: number,
    processingFeePercent: boolean,
    currency?: string,
    categoryId: string,
    subCategoryId?: string,
    comment: string,
    date: string,
    mode: TransactionMode,
    useLiveFx?: boolean
}

export const DefaultTransactionForm = {
    type: "expense",
    processingFeePercent: false,
    currency: SupportedCurrencies.PKR,
    categoryId: "",
    comment: "",
    date: new Date().toISOString().split('T')[0],
    mode: "online",
    useLiveFx: false,
}