import { Document } from "mongoose";

interface ICart extends Document{
    products: [],
    countTotal: number,
    orderBy: object
}

export {ICart}