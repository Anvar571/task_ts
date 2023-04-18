import ProductCtrl from "../controller/product.ctrl";
import { Router, } from "express";
import ValidationMiddleware from "../middleware/validation.middleware";
import validation from "../utils/validations/post.valid";

const ProductRoute: Router = Router();

const product = new ProductCtrl();

ProductRoute.get("/", product.getAllProduct.bind(product))

ProductRoute.post("/create", ValidationMiddleware(validation.create), product.create.bind(product))

export { ProductRoute }