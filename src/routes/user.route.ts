import { authMiddleware } from "../middleware/auth.middleware";
import UserCtrl from "../controller/user.ctrl";
import { Router, Request, Response } from "express";
import ValidationMiddleware from "../middleware/validation.middleware";
import {updateuser} from "../utils/validations/user.valid"
import { uploadImage } from "../utils/uploadImage";

const userRoute: Router = Router();

const userCtrl = new UserCtrl();

/**
 * @swagger
 * /api/user/me:
 *      get:
 *          summary: Get Current user
 *          tags:
 *              - User
 *          responses:
 *              200:
 *                  description: Current user
 *              400: 
 *                  description: Some error
 *              500:
 *                  description: Server Error
 */
userRoute.get("/me", authMiddleware, userCtrl.getCurrentUser.bind(userCtrl));

/**
 * @swagger
 * /api/user:
 *      get:
 *          summary: Get all users
 *          tags:
 *              - User
 *          responses:
 *              200:
 *                  description: GEt all user
 *              400: 
 *                  description: Some error
 *              500:
 *                  description: Server Error
 *          
 */
userRoute.get("/", authMiddleware, userCtrl.getAllUser.bind(userCtrl));

/**
 * @swagger
 * /api/user/{id}:
 *      get:
 *          summary: Get one user by id
 *          tags:
 *              - User
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *          response:
 *              200:
 *                  description: Get one user
 *              400:
 *                  description: Some error
 *          
 */
userRoute.get("/:id", authMiddleware, userCtrl.getByIdUser.bind(userCtrl))

/**
 * @swagger
 * /api/user/{id}:
 *      put:
 *          summary: Update user data
 *          tags:
 *              - User
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Update user data
 *          responses:
 *              200:
 *                  description: Update user data success
 *              400: 
 *                  description: Some Error
 *              500:
 *                  description: Internal server error
 */
userRoute.put("/:id", authMiddleware, ValidationMiddleware(updateuser), userCtrl.updateUser.bind(userCtrl));

/**
 * @swagger
 * /api/user/upload:
 *      post:
 *          summary: Upload user image avatar
 *          tags:
 *              - User
 *      requestBody:
 *          required: true
 *          content:
 *            single/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  file:
 *                    type: string
 *                    format: binary
 *          responses:
 *              200:
 *                  description: Upload user image avatar
 *              400: 
 *                  description: Some Error
 *              500:
 *                  description: Internal server error
 */
userRoute.post("/upload", authMiddleware, uploadImage.single("image"), (req: Request, res: Response) => {
    res.status(200).send({message: "Upload image success!"})
});

export default userRoute;