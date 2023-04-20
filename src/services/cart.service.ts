import { ICart } from "../types/cart.interface";
import CartModel from "../model/cart.model";
import ProductModule from "../model/product.model";

class CartService {
    private cart = CartModel;
    private product = ProductModule;

    public async addCartUserProduct(data: ICart, user: any){
        try {
            const {product_id, quantity} = data;
            const user_id = user._id;

            const findProd: any = await this.product.findById(product_id).select("quantity price");
            
            if (quantity > findProd.quantity) {
                throw new Error(`Qolgan Ma'hsulotlar soni ${findProd.quantity} siz ko'p tanladingiz!`);
                return;
            }
            
            await this.product.findByIdAndUpdate(product_id, {
                quantity: findProd.quantity - quantity
            }, {new: true});

            const newCart = new this.cart({
                product_id, user_id, quantity, totalCount: findProd.price
            })

            await newCart.save();

            return newCart;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getCurrentUserCart(id: string){
        try {
            const cartuser = await this.cart.find({user_id: id}).populate("product_id", "title price quantity");

            if (!cartuser) throw new Error("This user cart is not defianed");

            return cartuser;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async deleteOneProductCart(id: string){
        try {
            await this.cart.findByIdAndDelete(id);

            return "Delete cart item success";
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateCartCount(id: string, quantity: number){
        try {
            const cartItem: any = await this.cart.findById(id).select("quantity");

            if (quantity > cartItem.quantity) {
                throw new Error(`This product quantity must be ${cartItem.quantity}`);
                return;
            }

            const cartUpdate = await this.cart.findByIdAndUpdate(id, {
                quantity
            }, {new: true})

            return cartUpdate
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default CartService