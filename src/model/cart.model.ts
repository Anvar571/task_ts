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
        default: 0
    },
    totalCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const CartModel = model<ICart>("cart", cartSchema);

export default CartModel