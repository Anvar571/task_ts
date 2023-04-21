import { ICategory } from "../types/category.interface";
import CategoryModel from "../model/category.model";

class CategoryService {
    private category = CategoryModel;

    public async addCategory(data: ICategory){
        try {
            const newCategory = await this.category.create(data);

            return newCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getAllCategory(){
        try {
            const allCategory = await this.category.find();

            return allCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default CategoryService