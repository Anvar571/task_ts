import HttpError from "../utils/validations/http.error";
import OrderService from "../services/order.service";
import { Request, Response, NextFunction } from "express";
import bot from "../bot/core/bot";
import { CustomRequest } from "../middleware/auth.middleware";

class OrderCtrl {
    private orderService = new OrderService();

    public async addOrder(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const result = await this.orderService.addOrder(req.body, req.user);

            // bot.telegram.sendMessage()

            res.status(201).send({message: "ordered successfull", ...result});
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack));
        }
    }

    public async getAllOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const {limit=10, page=1} = req.query;
            const result = await this.orderService.getAllOrder(Number(limit), Number(page)-1);

            res.status(200).send(result);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack));
        }
    }

    public async getByIdOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            if (!req.params.id) throw new Error("Id is not defined")
            const result = await this.orderService.getByIdOrder(req.params.id);

            res.status(200).send(result);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack));
        }
    }

    public async updateOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            if (!req.params.id) throw new Error("Id is not defined")

            const result = await this.orderService.updateOrder(req.params.id, req.body);

            res.status(200).send(result);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack));
        }
    }

    public async deleteOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            if (!req.params.id) throw new Error("Id is not defined")

            const result = await this.orderService.deleteOrder(req.params.id);

            res.status(200).send({message: result});
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack));
        }
    }
}

export default OrderCtrl