import { IProduct } from "../types/product.types";
import ProductModule from "../model/product.model";

class ProductService  {
    private post = ProductModule;

    public async create(title: string, description: string, price: number, count: number, images: []): Promise<IProduct> {
        try {
            const check = await this.post.findOne({title});
            if (check) throw new Error("Deblicat title product!");
            const post = await this.post.create({ title, description, price, count, images })
            
            return post
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default ProductService