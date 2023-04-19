import { Request, Response, NextFunction } from "express";

import HttpError from "../utils/validations/http.error";

function ErrorHandling(
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    try {
        const status = error.status || 500;
        const message = error.message || "Some error";

        res.status(status).send({
            status,
            message
        })
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

export default ErrorHandling