import { ICart } from "../types/cart.interface";
import mongoose, { Schema, model } from "mongoose"

const cartSchema = new Schema<ICart>({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "product"
            },
            count: Number,
            price: Number,
        }
    ],
    countTotal: Number,
    orderBy: {
        type: mongoose.Types.ObjectId,
        reg: "user"
    }
}, { timestamps: true })

const CartSchema = model<ICart>("cart", cartSchema);

export default CartSchema