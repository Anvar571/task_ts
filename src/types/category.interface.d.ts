import { Document } from "mongoose";

interface ICategory extends Document {
    type: string,
    description: string,
}

export {ICategory}