export interface ITransaction {
    id:string
    type: string,
    mode: string,
    amount: number,
    comment?: string
    categoryId: string,
    subCategoryId?: string,
    date: Date
}