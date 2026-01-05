import Joi from "joi";

export const profesorCrearSchema = Joi.object({
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
        'string.min': 'apellido_paterno debe tener mínimo {#limit} caracteres',
        'string.max': 'apellido_paterno no debe exceder {#limit} caracteres',
        'any.required': 'apellido_paterno es un campo obligatorio',
    }),

    apellido_materno: Joi.string().min(2).max(100).required().messages({
        'string.base': 'apellido_materno debe ser un texto',
        'string.empty': 'apellido_materno no puede estar vacío',
        'string.min': 'apellido_materno debe tener mínimo {#limit} caracteres',
        'string.max': 'apellido_materno no debe exceder {#limit} caracteres',
        'any.required': 'apellido_materno es un campo obligatorio',
    }),

    id_tipo_documento: Joi.number().integer().required().messages({
        'number.base': 'id_tipo_documento debe ser numérico',
        'any.required': 'id_tipo_documento es un campo obligatorio',
    }),

    numero_documento: Joi.string().min(8).max(20).required().messages({
        'string.base': 'numero_documento debe ser un texto',
        'string.empty': 'numero_documento no puede estar vacío',
        'string.min': 'numero_documento debe tener mínimo {#limit} caracteres',
        'string.max': 'numero_documento no debe exceder {#limit} caracteres',
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

    grado_academico: Joi.string().min(3).max(100).required().messages({
        'string.base': 'grado_academico debe ser un texto',
        'string.empty': 'grado_academico no puede estar vacío',
        'string.min': 'grado_academico debe tener mínimo {#limit} caracteres',
        'string.max': 'grado_academico no debe exceder {#limit} caracteres',
        'any.required': 'grado_academico es un campo obligatorio',
    }),

    telefono: Joi.string().min(6).max(20).optional().messages({
        'string.base': 'telefono debe ser un texto',
    }),

    email: Joi.string().email().optional().messages({
        'string.email': 'email debe ser válido',
    }),

    pago_mensual: Joi.number().optional().messages({
        'number.base': 'pago_mensual debe ser numérico',
    }),

    fecha_ingreso: Joi.date().optional().messages({
        'date.base': 'fecha_ingreso debe ser una fecha válida',
    }),
});

export const profesorActualizarSchema = profesorCrearSchema;
