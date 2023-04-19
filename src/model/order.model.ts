import { IOrder } from "../types/order.interface";
import mongoose, {Schema, model} from "mongoose";

const orderSchema = new Schema<IOrder>({
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: "product"
    },
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