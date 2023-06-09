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
            const res = await this.cart.findByIdAndDelete(id);
            if (!res) throw new Error("This cart item is not defined");

            return "Delete cart item success";
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateCartQuantity(id: string, quantity: number){
        try {
            const cartItem: any = await this.cart.findById(id);

            if (!cartItem) throw new Error("This cart item is not defined");

            if (quantity > cartItem.product_id.quantity) {
                throw new Error(`Mahsulotning umumiy soni ${cartItem.product_id.quantity}ta siz notog'ri tanladingiz`);
                return;
            }

            const cartUpdate = await this.cart.findByIdAndUpdate(id, {
                quantity,
                product_id: {
                    quantity: cartItem.product_id.quantity - quantity
                }
            }, {new: true});

            // const resultData = await  cartItem

            return cartUpdate
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default CartService