import HttpError from "../utils/validations/http.error";
import CartService from "../services/cart.service";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/auth.middleware";

class CartCtrl {
    private cart = new CartService();

    public async addCart(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ) {
        // product id and product soni
        try {
            await this.cart.addCartUserProduct(req.body, req.user);
            
            res.status(201).send({message: "This product add to cart success"});
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async getCurrentUserCart(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const userCart= await this.cart.getCurrentUserCart(req.user.id);

            // const allProdSum = 

            res.status(200).send({userCart, });
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async updateCartItems() {
        // cartdagi productni sonini o'zgartirish
    }

    public async delteCartItem() {
        // cartdan biror productni o'chirish
    }

}

export default CartCtrl