import { IProduct } from "../types/product.types";
import ProductModule from "../model/product.model";

class ProductService {
    private product = ProductModule;

    public async create(title: string, description: string, price: number, quantity: number, images: []): Promise<IProduct> {
        try {
            const check = await this.product.findOne({ title });
            if (check) throw new Error("Deblicat title product!");
            const product = await this.product.create({ title, description, price, quantity, images })

            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async update(id: string, data: object): Promise<IProduct | any> {
        try {
            
            const update = await this.product.findByIdAndUpdate(id, data, {new: true})
            if (!update) throw new Error("This product is not defined");
            
            return update
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async delete(id: string): Promise<string> {
        try {
            const result = await this.product.findByIdAndDelete(id);
            if (!result) throw new Error("This product is not defained");
            
            return "Delete successfully"
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getById(id: string): Promise<IProduct| any> {
        try {
            const product = await this.product.findById(id);
            if (!product) throw new Error("This product is not defained");

            return product;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllProduct(limit: number, page: number, sort: string, search: string) {
        try {
            const allProduct = await this.product.find({
                $or: [
                    {title: {$regex: search, $options: "i"}},
                    {description: {$regex: search, $options: "i"}},
                ]
            })
            .limit(limit)
            .skip(page * limit)
            .sort(sort);

            return allProduct;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default ProductService