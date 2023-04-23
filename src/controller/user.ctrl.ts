import HttpError from "../utils/validations/http.error";
import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middleware/auth.middleware";
import * as multer from "multer";


class UserCtrl {
    private serveice = new UserService();

    public async getAllUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
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
    ) {
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
    ) {
        try {
            if (!req.params.id) throw new Error("Id is not defined")

            const user = await this.serveice.getById(req.params.id);

            res.status(200).send(user);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async updateUser(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.params.id) throw new Error("Id is not defined")

            const result = await this.serveice.updateUserData(req.params.id, req.body);

            res.status(201).send(result);
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async uploadImage(
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (req.file?.mimetype == "image/png" || req.file?.mimetype == "image/jpeg"){
                const user = await this.serveice.uploadUmage(String(req.file?.path), req.user.id);

                return res.status(200).send({ message: "Upload image success!", user });
            }
            
            throw new Error("This upload file type exists! \nFile type only png or jpeg")
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }
}

export default UserCtrl