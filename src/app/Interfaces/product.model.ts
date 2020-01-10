export interface ProductModel {
    id?: string,
    name: string,
    type: string,
    price: number,
    calory: number,
    imageUrl: string,
    description: string,
    ingredients: string[],
}