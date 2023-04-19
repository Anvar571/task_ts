import { Document } from "mongoose";

interface ICart extends Document{
    user_id: object,
    product_id: object,
    quantity: number,
    totalCount: number
}

export {ICart, IAddCart}