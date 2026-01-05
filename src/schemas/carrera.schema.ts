import Joi from "joi";

export const carreraCrearSchema = Joi.object({
    nombre_carrera: Joi.string().min(3).max(100).required()
    .messages({
        'string.base': `nombre_carrera debe ser un texto`,
        'string.empty': `nombre_carrera no puede estar vacío`,
        'string.min': `nombre_carrera debe tener mínimo {#limit} caracteres`,
        'string.max': `nombre_carrera no debe exceder {#limit} caracteres`,
        'any.required': `nombre_carrera es un campo obligatorio`,
    }),
});

export const carreraActualizarSchema = Joi.object({
    nombre_carrera: Joi.string().min(3).max(100).required()
    .messages({
        'string.base': `nombre_carrera debe ser un texto`,
        'string.empty': `nombre_carrera no puede estar vacío`,
        'string.min': `nombre_carrera debe tener mínimo {#limit} caracteres`,
        'string.max': `nombre_carrera no debe exceder {#limit} caracteres`,
        'any.required': `nombre_carrera es un campo obligatorio`,
    }),
});