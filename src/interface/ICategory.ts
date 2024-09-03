export interface ICategory {
    name: string,
    id: string
    type: string
    subCategories?: ISubCategory[]

}

export interface ISubCategory {
    name: string
    id: string
}