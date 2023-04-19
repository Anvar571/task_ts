import HttpError from "../utils/validations/http.error";
import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/auth.middleware";

class UserCtrl {
    private serveice = new UserService();

    public async getAllUser(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const data = await this.serveice.getAllUser();
            res.status(200).send(data);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async getCurrentUser(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const currnetUser = req.user;

            res.status(200).send(currnetUser);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async getByIdUser(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const user = await this.serveice.getById(req.params.id);

            res.status(200).send(user);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }
}

export default UserCtrl