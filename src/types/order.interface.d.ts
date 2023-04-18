import {Document} from "mongoose";

interface IOrder extends Document {
    products: [],
    userby: object,
    orderStatus: object
}

export {IOrder}