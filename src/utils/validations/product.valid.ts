import joi from "joi";

const create  = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    images: joi.array()
})

const update = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    price: joi.number().required(),
    count: joi.number().required(),
})

export default {create, update}