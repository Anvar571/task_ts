import joi from "joi";

const register  = joi.object({
    username: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    firstname: joi.string().required()
})

const login = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
})

export default {register, login}