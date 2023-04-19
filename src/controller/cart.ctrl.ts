import CartService from "../services/cart.service";
import { Request, Response, NextFunction } from "express";

class CartCtrl {
    private cart = new CartService();

    public async addCart(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        // product id and product soni
    }

    public async getCart(){
        // all cart items
    }

    public async updateCartItems(){
        // cartdagi productni sonini o'zgartirish
    }

    public async delteCartItem(){
        // cartdan biror productni o'chirish
    }

}

export default CartCtrl