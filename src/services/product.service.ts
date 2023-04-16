import { IProduct } from "../types/product.types";
import ProductModule from "../model/product.model";

class ProductService  {
    private post = ProductModule;

    public async create(title: string, description: string, price: number, count: number, images: []): Promise<IProduct> {
        try {
            const post = await this.post.create({ title, description, price, count, images })
            
            return post
        } catch (error) {
            throw new Error("Unable to create post")
        }
    }
}

export default ProductService