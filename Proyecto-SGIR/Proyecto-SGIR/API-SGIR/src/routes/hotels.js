import { Router } from 'express';
import upload from '../middleware/upload.js';
import { validationResult } from 'express-validator';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';
import { create, getAll, getById, update, remove } from '../controllers/hotelcontrollers.js';
import { hotelCreateRules } from '../validators/hotelvalidatorDTO.js';


const router = Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// GET all hotels
router.get('/', verifyToken, verifyRole(['administrador', 'cliente']), getAll);

// GET hotel by ID
router.get('/:id', verifyToken, verifyRole(['administrador', 'cliente']), getById);

// POST create hotel
router.post(
  '/',
  verifyToken,
  verifyRole(['administrador']),
  upload.single('imagen'),
  hotelCreateRules,
  handleValidation,
  create
);

// PUT update hotel
router.put(
  '/:id',
  verifyToken,
  verifyRole(['administrador']),
  upload.single('imagen'),
  hotelCreateRules,
  handleValidation,
  update
);

// DELETE hotel
router.delete('/:id', verifyToken, verifyRole(['administrador']), remove);

export default router;
