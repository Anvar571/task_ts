import Order from "../model/order.model";
import { IOrder } from "../types/order.interface";

class OrderService {
    private orderM = Order;

    public async addOrder(data: IOrder){
        try {
            const create = await this.orderM.create(data);

            return create
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllOrder(){
        try {
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getByIdOrder(){
        try {
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateOrder(){
        try {
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async deleteOrder(){
        try {
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default OrderService