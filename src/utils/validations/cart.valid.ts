import joi from "joi";

const cartValid  = joi.object({
    product_id: joi.string().required(),
    user_id: joi.string().required(),
    quantity: joi.number().required()
})

export {cartValid}