import { authMiddleware } from "../middleware/auth.middleware";
import OrderCtrl from "../controller/order.ctrl";
import { Router } from "express";

const orderRoute: Router = Router();

const orderCtrl = new OrderCtrl();

/**
 * @swagger
 * /api/order/add:
 *      post:
 *          summary: Order add
 *          tags:
 *              - Order
 */
orderRoute.post("/add", authMiddleware, orderCtrl.addOrder.bind(orderCtrl));

export default orderRoute