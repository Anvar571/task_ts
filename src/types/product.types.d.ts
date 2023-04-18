import mongoose, { Document, Types } from "mongoose";

interface IProduct extends Document{
    title: string,
    description?: string,
    price: number,
    images?: [],
    count: number
}

export {IProduct}