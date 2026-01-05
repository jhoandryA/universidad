import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().required()
    .messages({
        'string.base': `username debe ser un texto`,
        'string.empty': `username no puede estar vacío`,
        'any.required': `username es un campo obligatorio`,
    }),
    password: Joi.string().required()
    .messages({
        'string.base': `password debe ser un texto`,
        'string.empty': `password no puede estar vacío`,
        'any.required': `password es un campo obligatorio`,
    })
});