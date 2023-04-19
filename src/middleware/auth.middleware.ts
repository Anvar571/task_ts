import jwt, {Secret} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../model/user.model";
import HttpError from "../utils/validations/http.error";

export interface CustomRequest extends Request {
    user?: any
}

async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const secret: string = process.env.JWT_SECRET || "";
        const secret_key: Secret = secret;
        const token = req.headers.authorization;
        
        if (!token) throw new Error("Please login now!");

        const decode: any = jwt.verify(token, secret_key);
        const user = await User.findById(decode._id);
        req.user = user;

        next();
    } catch (error: any) {
        next(new HttpError(400, error.message, error.stack))
    }
}

async function checkLogin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization;
        if (token) res.status(200).send({message: "You is already login is not entered login or register"});
        next()
    } catch (error: any) {
        next(new HttpError(400, error.message, error.stack))
    }
}

export {authMiddleware, checkLogin}
