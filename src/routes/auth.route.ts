import ValidationMiddleware from "../middleware/validation.middleware";
import AuthCtrl from "../controller/auth.ctrl";
import {Router} from "express";
import authVaild from "../utils/validations/auth.vaild";
import { checkLogin } from "../middleware/auth.middleware";

const authRoute: Router = Router();

const authCtrl = new AuthCtrl()

/**
 * @swagger
 * /api/auth/register:
 *      post:
 *          summary: Register user
 *          tags:
 *              - AUTH
 */
authRoute.post(
    "/register",
    ValidationMiddleware(authVaild.register), 
    authCtrl.register.bind(authCtrl)
);

/**
 * @swagger
 * /api/auth/login:
 *      post:
 *          summary: Login user
 *          tags:
 *              - AUTH
 */
authRoute.post(
    "/login",
    ValidationMiddleware(authVaild.login),
    authCtrl.login.bind(authCtrl)
)

/**
 * @swagger
 * /api/auth/logout:
 *      post:
 *          summary: User logout
 *          tags:
 *              - AUTH
 */
authRoute.post(
    "/logout",
    authCtrl.logout.bind(authCtrl)
)

export default authRoute