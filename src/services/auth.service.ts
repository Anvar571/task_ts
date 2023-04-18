import {Schema} from "mongoose";
import User from "../model/user.model";

class AuthService {
    public user = User;

    public register(){}

    public login(){
    }

    public logout(){}

    public refreshtoken(){}
}

export default AuthService