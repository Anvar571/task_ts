import joi from "joi";

const orderAdd  = joi.object({
    product_id: joi.string().required(),
    userby: joi.string(),
    orderStatus: joi.string()
})

const orderUpdate = joi.object({
    orderStatus: joi.string().required()
})

export {orderAdd, orderUpdate}