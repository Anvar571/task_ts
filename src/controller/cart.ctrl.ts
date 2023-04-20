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

            res.status(201).send({ message: "This product add to cart success" });
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async getCurrentUserCart(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userCart = await this.cart.getCurrentUserCart(req.user.id);

            let total = 0;

            userCart.forEach((val) => {
                total += val.totalCount
            })

            res.status(200).send({ userCart, total });
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async updateCartItems() {
        // cartdagi productni sonini o'zgartirish
    }

    public async delteCartItem(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // cartdan biror productni o'chirish
        try {
            const result = await this.cart.deleteOneProductCart(req.params.id)

            res.status(200).send({ message: result })
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

}

export default CartCtrl