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
            // const limit = req.query.limit || "";
            // const page= req.query.page || "";
            // const sort= req.query.sort || "";
            // const skip = (parseInt(page) - 1) * parseInt(limit);

            const allProduct = await this.services.getAllProduct();

            res.status(200).send(allProduct);
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
    ): Promise<Response | void> {
        try {
            const result = await this.services.update(req.params.id, req.body);
            
            res.status(201).send({message: "Update successfully", result});
        } catch (error: any) {
            next(new HttpError(400, error.message));

        }
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const result = await this.services.delete(req.params.id);

            res.status(201).send({message: result})
        } catch (error: any) {
            next(new HttpError(400, error.message));
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const product = await this.services.getById(req.params.id);

            res.status(201).send(product);
        } catch (error: any) {
            next(new HttpError(400, error.message));
        }
    }
}

export default ProductCtrl;