import mongoose, {Document} from "mongoose";

interface IOrder extends Document {
    product_id: object,
    userby: object,
    orderStatus: object
}

export {IOrder}