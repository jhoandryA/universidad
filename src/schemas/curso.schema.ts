import Joi from "joi";

export const cursoCrearSchema = Joi.object({
    nombre_curso: Joi.string().min(3).max(150).required().messages({
        'string.base': 'nombre_curso debe ser un texto',
        'string.empty': 'nombre_curso no puede estar vacío',
        'string.min': 'nombre_curso debe tener mínimo {#limit} caracteres',
        'string.max': 'nombre_curso no debe exceder {#limit} caracteres',
        'any.required': 'nombre_curso es un campo obligatorio',
    }),

    id_carrera: Joi.number().integer().required().messages({
        'number.base': 'id_carrera debe ser numérico',
        'any.required': 'id_carrera es un campo obligatorio',
    }),

    id_profesor: Joi.number().integer().required().messages({
        'number.base': 'id_profesor debe ser numérico',
        'any.required': 'id_profesor es un campo obligatorio',
    }),

    creditos: Joi.number().integer().required().messages({
        'number.base': 'creditos debe ser numérico',
        'any.required': 'creditos es un campo obligatorio',
    }),

    horas_semanales: Joi.number().integer().optional().messages({
        'number.base': 'horas_semanales debe ser numérico',
    }),

    descripcion: Joi.string().max(500).optional().messages({
        'string.base': 'descripcion debe ser un texto',
        'string.max': 'descripcion no debe exceder {#limit} caracteres',
    }),
});
//HOLA
export const cursoActualizarSchema = cursoCrearSchema;
