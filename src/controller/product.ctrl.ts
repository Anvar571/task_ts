import ValidationMiddleware from "../middleware/validation.middleware";
import Controller from "../utils/interface/controller.interface";
import { Router, Response, Request, NextFunction } from "express";
import validation from "../utils/validations/post.valid";
import HttpError from "../utils/validations/http.error";

class ProductCtrl implements Controller {
    public path = "/post";
    public router: Router;

    constructor() {
        this.router = Router();
        this.initialRoute();
    }

    private initialRoute() {
        this.router.post(`${this.path}`, ValidationMiddleware(validation.create)),
        this.create
    }

    private async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { title, description } = req.body;

            console.log(title, description);
            
        } catch (error: any) {
            next(new HttpError(400, "Cannot create post"));
        }
    }
}

export default ProductCtrl;