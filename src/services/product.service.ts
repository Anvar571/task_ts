import { IProduct } from "../types/product.types";
import ProductModule from "../model/product.model";

class ProductService {
    private post = ProductModule;

    public async create(title: string, description: string, price: number, quantity: number, images: []): Promise<IProduct> {
        try {
            const check = await this.post.findOne({ title });
            if (check) throw new Error("Deblicat title product!");
            const product = await this.post.create({ title, description, price, quantity, images })

            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async update(id: string, data: object): Promise<IProduct | any> {
        try {
            
            const update = await this.post.findByIdAndUpdate(id, data, {new: true})
            if (!update) throw new Error("This product is not defined");
            
            return update
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async delete(id: string): Promise<string> {
        try {
            const result = await this.post.findByIdAndDelete(id);
            if (!result) throw new Error("This product is not defained");
            
            return "Delete successfully"
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getById(id: string): Promise<IProduct| any> {
        try {
            const product = await this.post.findById(id);
            if (!product) throw new Error("This product is not defained");

            return product;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllProduct() {
        try {
            const allProduct = await this.post.find();
            return allProduct;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default ProductService