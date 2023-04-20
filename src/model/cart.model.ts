import { ICart } from "../types/cart.interface";
import mongoose, { Schema, model } from "mongoose"

const cartSchema = new Schema<ICart>({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalCount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const CartModel = model<ICart>("cart", cartSchema);

export default CartModel