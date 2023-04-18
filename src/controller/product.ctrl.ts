import { Router, Response, Request, NextFunction } from "express";
import HttpError from "../utils/validations/http.error";
import ProductService from "../services/product.service";

class ProductCtrl {
    public router: Router;
    private services: ProductService;

    constructor() {
        this.router = Router();
        this.services = new ProductService();
    }

    public async getAllProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            res.send({ message: "salom " });
        } catch (error: any) {
            next(new HttpError(400, error.message))
        }
    }

    public async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { title, description, price, count, images } = req.body;

            const post = await this.services.create(title, description, price, count, images);

            res.status(201).send(post);
        } catch (error: any) {
            next(new HttpError(400, error.message));
        }
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>{
        const {title, description, price, count, images} = req.body;

    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>{

    }

    public async getById(
        req: Request, 
        res: Response
        ): Promise<Response|void>{
            
        }
}

export default ProductCtrl;