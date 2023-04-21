import ValidationMiddleware from "../middleware/validation.middleware";
import AuthCtrl from "../controller/auth.ctrl";
import { Router } from "express";
import authVaild from "../utils/validations/auth.vaild";

const authRoute: Router = Router();

const authCtrl = new AuthCtrl()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user and return a token
 *     tags:
 *          - AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                  type: string
 *                  example: lorem
 *               email:
 *                  type: string
 *                  example: admin312@gmail.com
 *               password:
 *                  type: string
 *                  example: 312434151
 *               firstname:
 *                  type: string
 *                  example: lorem ipsum
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */
authRoute.post(
    "/register",
    ValidationMiddleware(authVaild.register),
    authCtrl.register.bind(authCtrl)
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and return a token
 *     tags:
 *          - AUTH
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin312@gmail.com
 *               password:
 *                 type: string
 *                 example: 312434151
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */
authRoute.post(
    "/login",
    ValidationMiddleware(authVaild.login),
    authCtrl.login.bind(authCtrl)
)

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout user
 *     tags:
 *          - AUTH
 *     responses:
 *       200:
 *         description: Logout success
 */
authRoute.post(
    "/logout",
    authCtrl.logout.bind(authCtrl)
)

export default authRoute