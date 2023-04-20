import { authMiddleware } from "../middleware/auth.middleware";
import UserCtrl from "../controller/user.ctrl";
import { Router } from "express";

const userRoute: Router = Router();

const userCtrl = new UserCtrl();

/**
 * @swagger
 * /api/user/me:
 *      get:
 *          summary: Get Current user
 *          tags:
 *              - User
 *          
 */
userRoute.get("/me", authMiddleware, userCtrl.getCurrentUser.bind(userCtrl));

/**
 * @swagger
 * /api/user:
 *      get:
 *          summary: Get all users
 *          tags:
 *              - User
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
 *              -in: path
 *              name: id
 *              required: true
 *          response:
 *              200:
 *          
 */
userRoute.get("/:id", authMiddleware, userCtrl.getByIdUser.bind(userCtrl))

export default userRoute;