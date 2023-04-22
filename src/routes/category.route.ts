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
 *          responses:
 *              200:
 *                  description: get request success
 *              400: 
 *                  description: Some error
 */
categoryRoute.get("/get", authMiddleware, categoryCtrl.getAllcategory.bind(categoryCtrl));
/**
 * @swagger
 * /api/category/add:
 *      post:
 *          summary: Add new category
 *          tags:
 *              - Category
 *          requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              type:
 *                                  type: string
 *                                  example: phone
 *                              description:
 *                                  type: string
 *                                  example: Telefonlar haqida ma'lumot
 *          responses:
 *              201:
 *                  description: Category add success
 *              400:
 *                  description: There may be an error sendning the request
 *         
 */
categoryRoute.post("/add", authMiddleware, ValidationMiddleware(categoryadd), categoryCtrl.addCategory.bind(categoryCtrl));

export default categoryRoute