import { Schema, model } from "mongoose";
import { IProduct } from "../types/product.types";

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    images: [],
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const ProductModule = model<IProduct>("product", productSchema);

export default ProductModule