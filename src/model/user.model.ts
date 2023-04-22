import { Schema, model } from "mongoose";
import { IAUTH } from "../types/auth.interface";

const userSchema = new Schema<IAUTH>({
    firstname:{
        type: String,
        required: true,
        minlength: [3, "firstname must be at 3 length character"]
    },
    username: {
        type: String,
        required: true,
        minlength: [3, "username must be at 3 length character"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be at 6 length character"]
    },
    avatar:{
        type: String,
    }
}, {timestamps: true})

const User = model<IAUTH>("user", userSchema);

export default User;