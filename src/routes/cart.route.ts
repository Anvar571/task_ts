import ValidationMiddleware from "../middleware/validation.middleware";
import { Router } from "express";
import { cartValid, updateCart } from "../utils/validations/cart.valid";
import CartCtrl from "../controller/cart.ctrl";
import { authMiddleware } from "../middleware/auth.middleware";

const cartRoute: Router = Router();

const cartCtrl = new CartCtrl();
/**
 * @swagger
 * /api/cart/me:
 *      get:
 *          summary: Get current user cart
 *          tags:
 *              - Cart
 *          responses:
 *              '200':
 *                  description: ok
 *              '400':
 *                  description: There may be an error sendning the request
 *              '500':
 *                  description: Internal error
 */
cartRoute.get("/me", authMiddleware, cartCtrl.getCurrentUserCart.bind(cartCtrl));

/**
 * @swagger
 * /api/cart/add:
 *      post:
 *          summary: add product to cart
 *          tags:
 *              - Cart
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              product_id:
 *                                  type: ObjectID
 *                                  example: 64417dcaf89068d47a7c4d5b
 *                              quantity:
 *                                  type: number
 *                                  example: 4
 *          responses:
 *              201:
 *                  description: Product add to cart success
 *              400:
 *                  description: There may be an error sendning the request
 * 
 */
cartRoute.post("/add", authMiddleware, ValidationMiddleware(cartValid), cartCtrl.addCart.bind(cartCtrl));

/**
 * @swagger
 * /api/cart/update/{id}:
 *      put:
 *          summary: Update product to cart
 *          tags:
 *              - Cart
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Erter cart id
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              quantity:
 *                                  type: number
 *                                  example: 2
 *          responses:
 *              201:
 *                  description: Product delete to cart success
 *              400:
 *                  description: There may be an error sendning the request
 * 
 */
cartRoute.put("/update/:id", authMiddleware, ValidationMiddleware(updateCart), cartCtrl.updateCartItems.bind(cartCtrl));

/**
 * @swagger
 * /api/cart/delete/{id}:
 *      delete:
 *          summary: Delete product to cart
 *          tags:
 *              - Cart
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Erter cart id
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
 *          responses:
 *              201:
 *                  description: Product delete to cart success
 *              400:
 *                  description: There may be an error sendning the request
 * 
 */
cartRoute.delete("/delete/:id", authMiddleware, cartCtrl.delteCartItem.bind(cartCtrl));

export default cartRoute