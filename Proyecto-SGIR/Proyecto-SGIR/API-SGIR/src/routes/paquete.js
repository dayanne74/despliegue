import { Router } from 'express';
import { getAll, getById, create, update, remove, buscarPorDestino, filtrarPorEstado } from '../controllers/paquetecontrolador.js';
import upload from '../middleware/upload.js';
import { createRules } from '../validators/paquetevalidatorDTO.js';
import { validationResult } from 'express-validator';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', verifyToken, verifyRole(['administrador', 'cliente']), getAll);


router.post(
  '/',
  verifyToken,
  verifyRole(['administrador']),
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

router.get('/buscar', verifyToken, verifyRole(['administrador', 'cliente']), buscarPorDestino);
router.get('/estado', verifyToken, verifyRole(['administrador', 'cliente']), filtrarPorEstado);
router.get('/:id', verifyToken, verifyRole(['administrador', 'cliente']), getById);

router.delete('/:id', verifyToken, verifyRole(['administrador']), remove);


export default router;
