import joi from "joi";

const updateuser  = joi.object({
    username: joi.string().required(),
    firstname: joi.string().required(),
    email: joi.string().required()
})

export {updateuser}