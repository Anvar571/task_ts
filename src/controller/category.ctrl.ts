import HttpError from "../utils/validations/http.error";
import CategoryService from "../services/category.service";
import { Request, Response, NextFunction } from "express";

class CategoryCtrl {
    private crodService = new CategoryService();

    public async addCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const result = await this.crodService.addCategory(req.body);

            res.status(201).send(result);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async getAllcategory(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const allCategory = await this.crodService.getAllCategory();

            res.status(200).send(allCategory);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }
}

export default CategoryCtrl