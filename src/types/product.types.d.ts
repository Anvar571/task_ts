import mongoose, { Document } from "mongoose";

interface IProduct extends Document{
    title: string,
    description?: string,
    price: number,
    images?: [],
    quantity: number,
    type: object,
    isOrder: boolean
}

export {IProduct}