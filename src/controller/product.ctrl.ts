import ValidationMiddleware from "../middleware/validation.middleware";
import Controller from "../utils/interface/controller.interface";
import { Router, Response, Request, NextFunction } from "express";
import validation from "../utils/validations/post.valid";
import HttpError from "../utils/validations/http.error";
import ProductService from "../services/product.service";

class ProductCtrl implements Controller {
    public path = "/post";
    public router: Router;
    private ProductService: ProductService;
    
    constructor() {
        this.router = Router();
        this.ProductService = new ProductService();
        this.initialRoute();
    }

    private initialRoute() {
        this.router.post(`${this.path}`, ValidationMiddleware(validation.create), this.create),
        this.router.get(`${this.path}`, this.getAllProduct)
    }

    private async getAllProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response| void> {
        try {
            res.send({message: "salom "});
        } catch (error: any) {
            next(new HttpError(400, error.message))
        }
    }

    private async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { title, description, price, count, images } =   req.body;
            
            const post = await this.ProductService.create(title, description, price, count, images);

            res.status(201).send(post);
        } catch (error: any) {
            next(new HttpError(400, error.message));
        }
    }
}

export default ProductCtrl;