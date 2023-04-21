import { authMiddleware } from "../middleware/auth.middleware";
import OrderCtrl from "../controller/order.ctrl";
import { Router } from "express";
import ValidationMiddleware from "../middleware/validation.middleware";
import {orderAdd, orderUpdate} from "../utils/validations/order.valid";

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
orderRoute.post("/add", authMiddleware, ValidationMiddleware(orderAdd), orderCtrl.addOrder.bind(orderCtrl));

/**
 * @swagger
 * /api/order/all:
 *      get:
 *          summary: get all order
 *          tags:
 *              - Order
 */
orderRoute.get("/get", authMiddleware, orderCtrl.getAllOrder.bind(orderCtrl));
/**
 * @swagger
 * /api/order/update/{id}:
 *      put:
 *          summary: Order status update
 *          tags:
 *              - Order
 */
orderRoute.put("/:id", authMiddleware, orderCtrl.updateOrder.bind(orderCtrl));
/**
 * @swagger
 * /api/order/delete:
 *      delete:
 *          summary: Order delete
 *          tags:
 *              - Order
 */
orderRoute.delete("/:id", authMiddleware, orderCtrl.deleteOrder.bind(orderCtrl));
/**
 * @swagger
 * /api/order/{id}:
 *      get:
 *          summary: get One order by id
 *          tags:
 *              - Order
 */
orderRoute.get("/:id", authMiddleware, orderCtrl.getByIdOrder.bind(orderCtrl));

export default orderRoute