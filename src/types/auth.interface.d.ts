import { Document } from "mongoose"

interface IAUTH  extends Document {
    firstname: string,
    username: string,
    email: string,
    password: string,
    avatar: string
}

interface ILogin extends Document {
    email: string,
    password: string
}

export {IAUTH, ILogin}