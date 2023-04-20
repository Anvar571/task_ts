import OrderService from "../services/order.service";
import { Request, Response, NextFunction } from "express";

class OrderCtrl {
    private orderService = new OrderService();

    public async addOrder(){}

    public async getAllOrder(){}

    public async getByIdOrder(){}

    public async updateOrder(){}

    public async deleteOrder(){}
}

export default OrderCtrl