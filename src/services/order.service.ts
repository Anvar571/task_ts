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

            prod.isOrder = true

            return create
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllOrder(){
        try {
            const allOrder = await this.orderM.find();

            return allOrder;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getByIdOrder(id: string){
        try {
            const order = await this.orderM.findById(id);
            if (!order) throw new Error("This order is not defined");

            return order;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateOrder(id: string){
        try {
            const order = await this.orderM.findById(id);
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