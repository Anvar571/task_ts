import { Router } from "express";
import { createPaymentIntent } from "../controller/payment.ctrl";
const paymentRoute: Router = Router()

/**
 * @swagger
 * /api/payment/create:
 *      post:
 *          summary: Create payment
 *          tags:
 *              - Paymeny
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              amount:
 *                                  type: number
 *                                  example: 312
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