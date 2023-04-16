import { Schema, model } from "mongoose";
import { IProduct } from "../types/product.types";

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    images: [],
    price: {
        type: Number,
        required: true,
        default: 0
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

const Product = model<IProduct>("product", productSchema);

export default Product