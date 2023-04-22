import { ICategory } from "../types/category.interface";
import mongoose, {Schema, model} from "mongoose";

const categorySchema = new Schema<ICategory>({
    type: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    }
}, {timestamps: true})

const CategoryModel = model<ICategory>("category", categorySchema);

export default CategoryModel