import express from 'express';
import { createActividad, getActividad, getActividadById, deleteActividad } from '../controllers/actividadControllers.js';
const router = express.Router();

router.post('/actividad', createActividad);
router.get('/actividad', getActividad);
router.get('/actividad/:id', getActividadById);
router.delete('/actividad/:id', deleteActividad);

export default router;