import joi from "joi";

const create  = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    price: joi.number().required(),
    count: joi.number().required(),
    images: joi.array()
})

export default {create}