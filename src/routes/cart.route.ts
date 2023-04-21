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
 */
cartRoute.get("/me", authMiddleware, cartCtrl.getCurrentUserCart.bind(cartCtrl));
/**
 * @swagger
 * /api/cart/add:
 *      post:
 *          summary: add product to cart
 *          tags:
 *              - Cart
 */
cartRoute.post("/add", authMiddleware, ValidationMiddleware(cartValid), cartCtrl.addCart.bind(cartCtrl));
/**
 * @swagger
 * /api/cart/delete/{id}:
 *      delete:
 *          summary: Delete product to cart
 *          tags:
 *              - Cart
 */
cartRoute.delete("/delete/:id", authMiddleware, cartCtrl.delteCartItem.bind(cartCtrl));
/**
 * @swagger
 * /api/cart/update/{id}:
 *      update:
 *          summary: Update product to cart
 *          tags:
 *              - Cart
 */
cartRoute.put("/update/:id", authMiddleware, ValidationMiddleware(updateCart), cartCtrl.updateCartItems.bind(cartCtrl));

export default cartRoute