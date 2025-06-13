import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../controllers/excursionesControllers.js';

import upload from '../middleware/upload.js';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';
import { createRules } from '../validators/excursionesValidators.js';
import { validationResult } from 'express-validator';

const router = Router();

// Middleware para manejar validaciones
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// 🔓 Rutas públicas
router.get('/', getAll);
router.get('/:id', getById);

// 🔐 Rutas protegidas
router.post(
  '/',
  verifyToken,
  verifyRole(['administrador', 'cliente']),
  upload.single('imagen'),
  createRules,
  handleValidation,
  create
);

router.put(
  '/:id',
  verifyToken,
  verifyRole(['administrador']),
  upload.single('imagen'),
  createRules,
  handleValidation,
  update
);

router.delete(
  '/:id',
  verifyToken,
  verifyRole(['administrador', 'cliente']),
  remove
);

export default router;
