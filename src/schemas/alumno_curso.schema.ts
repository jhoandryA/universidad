import Joi from "joi";

export const alumnoCursoCrearSchema = Joi.object({
    id_alumno: Joi.number().integer().required().messages({
        'number.base': 'id_alumno debe ser numérico',
        'any.required': 'id_alumno es un campo obligatorio',
    }),

    id_curso: Joi.number().integer().required().messages({
        'number.base': 'id_curso debe ser numérico',
        'any.required': 'id_curso es un campo obligatorio',
    }),

    ciclo: Joi.number().integer().required().messages({
        'number.base': 'ciclo debe ser numérico',
        'any.required': 'ciclo es un campo obligatorio',
    }),

    nota_final: Joi.number().optional().messages({
        'number.base': 'nota_final debe ser numérico',
    }),

    estado_curso: Joi.string().optional().messages({
        'string.base': 'estado_curso debe ser un texto',
    }),
});

export const alumnoCursoActualizarSchema = alumnoCursoCrearSchema;
