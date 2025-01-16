export interface ITransaction {
    id:string
    type: TransactionType,
    mode: string,
    amount: number,
    comment?: string
    categoryId: string,
    subCategoryId?: string,
    date: Date
}

export type TransactionType = "income" | "expense"
export enum TransactionTypeEnum {
    income = "income",
    expense = "expense"
};