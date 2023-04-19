import HttpError from "../utils/validations/http.error";
import AuthService from "../services/auth.service";
import { Request, Response, NextFunction} from "express";
import Jwt from "../utils/jwt/jwt";

class AuthCtrl {
    private authService = new AuthService();
    private jwt = new Jwt();

    public async register(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        try {
            const data = await this.authService.register(req.body);

            const token = await this.jwt.generateToken(data._id)

            res.status(201).send({message:"Register successfully",data, token})
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any>{
        try {
            const data = await this.authService.login(req.body);
            
            const token = await this.jwt.generateToken(data._id)
            const refreshtoken = await this.jwt.refreshToken(data._id)

            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30*24*60*60*1000
            })

            res.status(200).send({message: "Login successfully", data, token});
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }

    public async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            res.clearCookie("refreshtoken", {path: "/api/refresh_token"})
        } catch (error: any) {
            next(new HttpError(400, error.message, error.stack))
        }
    }
}

export default AuthCtrl