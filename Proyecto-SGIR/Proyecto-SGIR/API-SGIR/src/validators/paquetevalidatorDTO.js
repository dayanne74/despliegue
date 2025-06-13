import { body } from 'express-validator';

export const createRules = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('descripcion')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria'),

  body('destino')
    .trim()
    .notEmpty().withMessage('El destino es obligatorio'),

  body('actividad')
    .trim()
    .notEmpty().withMessage('La actividad es obligatoria'),

  body('numeroPersonas')
    .trim()
    .notEmpty().withMessage('El número de personas es obligatorio'),

  body('duracion')
    .trim()
    .notEmpty().withMessage('La duración es obligatoria'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),

  body('transporte')
    .trim()
    .notEmpty().withMessage('El transporte es obligatorio'),

  body('comida')
    .trim()
    .notEmpty().withMessage('La comida es obligatoria')
];
