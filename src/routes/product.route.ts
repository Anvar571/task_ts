import ProductCtrl from "../controller/product.ctrl";
import { Router, } from "express";
import ValidationMiddleware from "../middleware/validation.middleware";
import validation from "../utils/validations/product.valid";
import { authMiddleware } from "../middleware/auth.middleware";

const ProductRoute: Router = Router();

const product = new ProductCtrl();
/**
 * @swagger
 * /api/product:
 *      get:
 *          summary: Get all product
 *          tags:
 *              - Product
 *          description: Databasega saqlangan produktlarninig barchasini olish
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  title:
 *                                      type: string
 *                                  description:
 *                                       type: string
 *                                  price:
 *                                         type: number
 *                                  quantity:
 *                                          type: number
 * 
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
ProductRoute.get("/", authMiddleware, product.getAllProduct.bind(product))
/**
 * @swagger
 * /api/product/create:
 *      post:
 *          summary: Create new product
 *          tags:
 *              - Product
 *          description: Send a message to the server and get a response added to the original text.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
ProductRoute.post("/add", authMiddleware, ValidationMiddleware(validation.create), product.create.bind(product))

/**
 * @swagger
 * /api/product/{id}:
 *      get:
 *          summary: Product updte
 *          tags:
 *              - Product
 */
ProductRoute.get("/:id", authMiddleware, product.getById.bind(product));

/**
 * @swagger
 * /api/product/{id}:
 *      put:
 *          summary: Product updte
 *          tags:
 *              - Product
 */

ProductRoute.put("/:id", authMiddleware, product.update.bind(product));

/**
 * @swagger
 * /api/product/{id}:
 *      delete:
 *          summary: Product updte
 *          tags:
 *              - Product
 */
ProductRoute.delete("/:id", authMiddleware, product.delete.bind(product));


export { ProductRoute }