import { ICategory } from "../types/category.interface";
import CategoryModel from "../model/category.model";

class CategoryService {
    private category = CategoryModel;

    public async addCategory(data: ICategory) {
        try {
            const { type, description } = data;
            const newCategory = new this.category({
                type: type.toLowerCase(),
                description
            });

            return newCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllCategory() {
        try {
            const allCategory = await this.category.aggregate([
                {
                    $match: {}
                },
                {
                    $lookup: {
                        from: "product",
                        localField: "type",
                        foreignField: "type",
                        as: "product"
                    }
                }
            ]);

            return allCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default CategoryService