export interface ITransaction {
    type: string,
    mode: string,
    amount: number,
    comment?: string
    categoryId: string,
    subCategoryId?: string,
    date: string
}