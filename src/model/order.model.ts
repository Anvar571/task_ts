import { IOrder } from "../types/order.interface";
import mongoose, {Schema, model} from "mongoose";

const orderSchema = new Schema<IOrder>({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "product"
            },
            count: Number
        }
    ],
    userby: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    orderStatus: {
        type: String,
        default:"Not proccessed",
        enum: ["Not proccessed", "Cash on Delevery", "Processing", "Dispatched", "Cancelled", "Delivered"],
    }
})

const Order = model<IOrder>("order", orderSchema);

export default Order