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
 *          parameters:
 *              - in: query
 *                name: search
 *                required: false
 *                description: Search product
 *                schema:
 *                  type: string
 *                  default: "phone"
 *              - in: query
 *                name: limit
 *                required: false
 *                schema:
 *                  type: number
 *                  default: 5
 *              - in: query
 *                name: page
 *                required: false
 *                schema:
 *                  type: number
 *                  default: 2
 *              - in: query
 *                name: sort
 *                required: false
 *                schema:
 *                  type: string
 *                  default: title
 *          description: Databasega saqlangan produktlarninig barchasini olish
 *          responses:
 *              201:
 *                  description: Success
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
 *          description: Add new product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: any product name
 *                              description:
 *                                  type: string
 *                                  description: product about
 *                              price:
 *                                  type: number
 *                                  description: Product Price
 *                                  example: 1324
 *                              quantity:
 *                                  type: number
 *                                  description: Product soni
 *                                  example: 10
 *          responses:
 *              201:
 *                  description: Product created success
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
 *          summary: Get one product
 *          tags:
 *              - Product
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Enter product id
 *          responses:
 *              201:
 *                  description: Get one product success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
ProductRoute.get("/:id", authMiddleware, product.getById.bind(product));

/**
 * @swagger
 * /api/product/{id}:
 *      put:
 *          summary: Product update by id
 *          tags:
 *              - Product
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Enter product id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  example: any product name
 *                              description:
 *                                  type: string
 *                                  description: product about
 *                              price:
 *                                  type: number
 *                                  description: Product Price
 *                                  example: 1324
 *                              quantity:
 *                                  type: number
 *                                  description: Product soni
 *                                  example: 10
 *          responses:
 *              201:
 *                  description: Update product success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

ProductRoute.put("/:id", authMiddleware, product.update.bind(product));

/**
 * @swagger
 * /api/product/{id}:
 *      delete:
 *          summary: Product delete by id
 *          tags:
 *              - Product
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Enter product id
 *          responses:
 *              201:
 *                  description: Delete product success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
ProductRoute.delete("/:id", authMiddleware, product.delete.bind(product));

export { ProductRoute }