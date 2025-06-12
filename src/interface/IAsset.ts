export interface IAsset{
    name:string,
    quantity: number,
    pricePoints: IPricePoint[],
    currency:string
}

interface IPricePoint{
    price: number,
    date:Date
}