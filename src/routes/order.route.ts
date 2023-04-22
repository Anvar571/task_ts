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
 *          summary: Buyurtma berish
 *          tags:
 *              - Order
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              product_id:
 *                                  type: string
 *                                  example: 64417dcaf89068d47a7c4d5b
 *                              userby:
 *                                  type: string
 *                                  example: 64417dcaf89068d47a7c4d
 *          responses:
 *              201:
 *                  description: order add success
 *              400:
 *                  description: There may be an error sendning the request
 * 
 */
orderRoute.post("/add", authMiddleware, ValidationMiddleware(orderAdd), orderCtrl.addOrder.bind(orderCtrl));

/**
 * @swagger
 * /api/order/all:
 *      get:
 *          summary: Get all order
 *          tags:
 *              - Order
 *          parameters:
 *              - in: query
 *                name: limit
 *                required: false
 *                schema:
 *                  type: number
 *                  default: 5
 *              - in: query
 *                name: page
 *                required: false
 *                schema:
 *                  type: number
 *                  default: 2
 *          responses:
 *              200:
 *                  description: Get request success
 *              400:
 *                  description: Some Error
 */
orderRoute.get("/all", authMiddleware, orderCtrl.getAllOrder.bind(orderCtrl));

/**
 * @swagger
 * /api/order/update/{id}:
 *      put:
 *          summary: Ordered status update
 *          tags:
 *              - Order
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Order update status
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              orderStatus:
 *                                  type: string
 *                                  example: Proccessing
 *          responses:
 *              200:
 *                  description: Update order status request success
 *              400:
 *                  description: Some Error
 */
orderRoute.put("/update/:id", authMiddleware, orderCtrl.updateOrder.bind(orderCtrl));
/**
 * @swagger
 * /api/order/delete/{id}:
 *      delete:
 *          summary: Order delete
 *          tags:
 *              - Order
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Delete ordered product
 *          responses:
 *              200:
 *                  description: Delete request success
 *              400:
 *                  description: Some Error
 */
orderRoute.delete("/delete/:id", authMiddleware, orderCtrl.deleteOrder.bind(orderCtrl));
/**
 * @swagger
 * /api/order/{id}:
 *      get:
 *          summary: get One order by id
 *          tags:
 *              - Order
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Get one order product
 *          responses:
 *              200:
 *                  description: Get One order success
 *              400:
 *                  description: Some Error
 */
orderRoute.get("/:id", authMiddleware, orderCtrl.getByIdOrder.bind(orderCtrl));

export default orderRoute