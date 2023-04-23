import { IUser } from "../types/user.interface";
import User from "../model/user.model";

class UserService {
    private user = User;

    public async getAllUser(): Promise<IUser[]>{
        try {
            const users = await this.user.find();

            return users
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getById(id: string): Promise<IUser>{
        try {
            const user = await this.user.findById(id);
            if (!user) throw new Error("This user is not defined");
            return user
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async updateUserData(id: string, data: IUser) {
        try {
            const user = await this.user.findByIdAndUpdate(id, data, {new: true});
            if (!user) throw new Error("This user in not defined");
            return user
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async uploadUmage(url: string, userid: string){
        try {
            
            const user = await this.user.findByIdAndUpdate(userid, {
                avatar: url
            }, {new: true});
            
            if (!user) throw new Error("User is not found!")

            return user
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default UserService