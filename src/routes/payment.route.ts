import { Router } from "express";
import { createPaymentIntent } from "../controller/payment.ctrl";
const paymentRoute: Router = Router()

/**
 * @swagger
 * /api/payment/create:
 *      post:
 *          summary: Create payment
 *          tags:
 *              - Payment
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              order_id:
 *                                  type: string
 *                                  example: 64442b112080218c9db3d4d2
 *          responses:
 *              201:
 *                  description: Create payment success
 *              400:
 *                  description: Some error
 *              500: 
 *                  description: Server error
 */
paymentRoute.post("/create", createPaymentIntent);

export default paymentRoute