import User from "../model/user.model";
import { IAUTH, ILogin } from "../types/auth.interface"
import bcrypt from "bcrypt";

class AuthService {
    public user = User;

    public async register(data: IAUTH): Promise<IAUTH> {
        try {
            const { username, email, password, firstname } = data;
            const newusername = username.toLowerCase().trim();

            const user = await this.user.findOne({ email });
            if (user) throw new Error("This email already registered");

            const hashPass = await bcrypt.hash(password, 10);

            const newUser = new this.user({
                username: newusername,
                email,
                password: hashPass,
                firstname
            })

            await newUser.save();

            return newUser
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async login(data: ILogin) {
        try {
            const {email, password} = data;
            
            const user = await this.user.findOne({email});
            if (!user) throw new Error("User is not exists or password")

            const checkPass = await bcrypt.compare(password, user.password);

            if (!checkPass) throw new Error("User is not exists or password")

            return user
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default AuthService