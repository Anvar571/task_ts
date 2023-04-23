import ProductModule from "../model/product.model";
import Order from "../model/order.model";
import { IOrder } from "../types/order.interface";

class OrderService {
    private orderM = Order;
    private product = ProductModule

    public async addOrder(data: IOrder, user: any){
        try {
            const {product_id} = data;
            const userby = user._id;
            
            const prod = await this.product.findById(product_id)
            
            if (!prod) throw new Error("This product_id is not defined");
            
            if (prod.isOrder) throw new Error("This product already ordered");

            const create = new this.orderM({
                product_id,
                userby,
            });

            await create.save()

            await this.product.findByIdAndUpdate(product_id, {
                isOrder: true
            }, {new: true})

            return create
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllOrder(limit: number, page: number){
        try {
            const allOrder = await this.orderM.find().populate("product_id userby", "title description price username email firstname")
            .limit(limit)
            .skip(page * limit);

            return allOrder;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getByIdOrder(id: string){
        try {
            const order = await this.orderM.findById(id)
            .populate("product_id userby", "title description username email firstname price");

            if (!order) throw new Error("This order is not defined");

            return order;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateOrder(id: string, data: any){
        try {
            const order = await this.orderM.findByIdAndUpdate(id, data, {new: true})
            .populate("product_id user_id", "title description username email firstname");
            
            if(!order) throw new Error("This order order is not defined");

            return order
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async deleteOrder(id: string){
        try {
            const result = await this.orderM.findByIdAndDelete(id);
            if (!result) throw new Error("This order is not defined");
            
            return "Delete order successfully"
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default OrderService