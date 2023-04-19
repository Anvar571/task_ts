import { ICart } from "../types/cart.interface";
import CartModel from "../model/cart.model";

class CartService {
    private cart = CartModel;

    public async addCartUserProduct(data: ICart){
        try {
            const {product_id, user_id, quantity} = data;
            const newCart = new this.cart({
                product_id, user_id, quantity
            })
            
            await newCart.save();

            return newCart;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getOneUserCart(user: object){
        try {
            console.log(user);
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async deleteCartProduct(){
        try {
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateCartCount(){
        try {
            
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default CartService