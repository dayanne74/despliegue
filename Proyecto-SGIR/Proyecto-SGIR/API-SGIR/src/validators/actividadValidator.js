import Joi from 'joi';

const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

const nombre = Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        "string.base": "El nombre debe ser un texto.",
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre no puede exceder los 100 caracteres.",
        "any.required": "El campo nombre es requerido.",
    });

const descripcion = Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
        "string.base": "La descripción debe ser un texto.",
        "string.empty": "La descripción no puede estar vacía.",
        "string.min": "La descripción debe tener al menos 10 caracteres.",
        "string.max": "La descripción no puede exceder los 500 caracteres.",
        "any.required": "El campo descripción es requerido.",
    });

const duracion = Joi.number()
    .integer()
    .min(1)
    .max(1440) // máximo 24 horas en minutos
    .required()
    .messages({
        "number.base": "La duración debe ser un número entero.",
        "number.integer": "La duración debe ser un número entero.",
        "number.min": "La duración debe ser al menos 1 minuto.",
        "number.max": "La duración no puede exceder 1440 minutos (24 horas).",
        "any.required": "El campo duración es requerido.",
    });

const categoria = Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        "string.base": "La categoría debe ser un texto.",
        "string.empty": "La categoría no puede estar vacía.",
        "string.min": "La categoría debe tener al menos 3 caracteres.",
        "string.max": "La categoría no puede exceder los 50 caracteres.",
        "any.required": "El campo categoría es requerido.",
    });

const ubicacion = Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        "string.base": "La ubicación debe ser un texto.",
        "string.empty": "La ubicación no puede estar vacía.",
        "string.min": "La ubicación debe tener al menos 3 caracteres.",
        "string.max": "La ubicación no puede exceder los 100 caracteres.",
        "any.required": "El campo ubicación es requerido.",
    });

const precio = Joi.number()
    .min(0)
    .required()
    .messages({
        "number.base": "El precio debe ser un número.",
        "number.min": "El precio no puede ser negativo.",
        "any.required": "El campo precio es requerido.",
    });

const createActividadSchema = Joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    duracion: duracion.required(),
    categoria: categoria.required(),
    ubicacion: ubicacion.required(),
    precio: precio.required(),
});

const getActividadSchema = Joi.object({
    id: id.required(),
});

const deleteActividadSchema = Joi.object({
    id: id.required(),
});

export {
    createActividadSchema,
    getActividadSchema,
    deleteActividadSchema,
};
