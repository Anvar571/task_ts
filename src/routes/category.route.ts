import { authMiddleware } from "../middleware/auth.middleware";
import CategoryCtrl from "../controller/category.ctrl";
import { Router } from "express";
import ValidationMiddleware from "../middleware/validation.middleware";
import {categoryadd} from "../utils/validations/category.valid"

const categoryRoute: Router = Router();

const categoryCtrl = new CategoryCtrl();

/**
 * @swagger
 * /api/category/get:
 *      get:
 *          summary: Get all category
 *          tags:
 *              - Category
 */
categoryRoute.get("/get", authMiddleware, categoryCtrl.getAllcategory.bind(categoryCtrl));
/**
 * @swagger
 * /api/category/add:
 *      post:
 *          summary: Add new category
 *          tags:
 *              - Category
 */
categoryRoute.post("/add", authMiddleware, ValidationMiddleware(categoryadd), categoryCtrl.addCategory.bind(categoryCtrl));

export default categoryRoute