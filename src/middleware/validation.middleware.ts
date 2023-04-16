import HttpError from "../utils/validations/http.error";
import {Request, Response, NextFunction, RequestHandler} from "express";

import Joi from "joi";

function ValidationMiddleware(schema: Joi.Schema): RequestHandler{
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validOp = {
            abortEarly: false,
            allowUnknow: true,
            scriptUnknow: true
        }

        try {
            const value = await schema.validateAsync(req.body, validOp);
            req.body = value;

            next();
        } catch (error: any) {
            next(new HttpError(400, error.message))
        }
    }
}

export default ValidationMiddleware