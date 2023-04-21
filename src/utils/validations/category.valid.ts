import joi from "joi";

const categoryadd  = joi.object({
    type: joi.string().required(),
    description: joi.string().required()
})

export {categoryadd}