import Joi from "joi";

export const alumnoCrearSchema = Joi.object({
    nombres: Joi.string().min(3).max(100).required().messages({
        'string.base': 'nombres debe ser un texto',
        'string.empty': 'nombres no puede estar vacío',
        'string.min': 'nombres debe tener mínimo {#limit} caracteres',
        'string.max': 'nombres no debe exceder {#limit} caracteres',
        'any.required': 'nombres es un campo obligatorio',
    }),

    apellido_paterno: Joi.string().min(2).max(100).required().messages({
        'string.base': 'apellido_paterno debe ser un texto',
        'string.empty': 'apellido_paterno no puede estar vacío',
        'any.required': 'apellido_paterno es un campo obligatorio',
    }),

    apellido_materno: Joi.string().min(2).max(100).required().messages({
        'string.base': 'apellido_materno debe ser un texto',
        'string.empty': 'apellido_materno no puede estar vacío',
        'any.required': 'apellido_materno es un campo obligatorio',
    }),

    id_tipo_documento: Joi.number().integer().required().messages({
        'number.base': 'id_tipo_documento debe ser numérico',
        'any.required': 'id_tipo_documento es un campo obligatorio',
    }),

    numero_documento: Joi.string().min(8).max(20).required().messages({
        'string.base': 'numero_documento debe ser un texto',
        'string.empty': 'numero_documento no puede estar vacío',
        'any.required': 'numero_documento es un campo obligatorio',
    }),

    id_sexo: Joi.number().integer().required().messages({
        'number.base': 'id_sexo debe ser numérico',
        'any.required': 'id_sexo es un campo obligatorio',
    }),

    id_estado_civil: Joi.number().integer().required().messages({
        'number.base': 'id_estado_civil debe ser numérico',
        'any.required': 'id_estado_civil es un campo obligatorio',
    }),

    id_carrera: Joi.number().integer().required().messages({
        'number.base': 'id_carrera debe ser numérico',
        'any.required': 'id_carrera es un campo obligatorio',
    }),

    ciclo: Joi.number().integer().optional().messages({
        'number.base': 'ciclo debe ser numérico',
    }),

    telefono: Joi.string().optional().messages({
        'string.base': 'telefono debe ser un texto',
    }),

    email: Joi.string().email().optional().messages({
        'string.email': 'email debe ser válido',
    }),

    fecha_ingreso: Joi.date().optional().messages({
        'date.base': 'fecha_ingreso debe ser una fecha válida',
    }),

    estado_academico: Joi.string().optional().messages({
        'string.base': 'estado_academico debe ser un texto',
    }),
});

export const alumnoActualizarSchema = alumnoCrearSchema;
