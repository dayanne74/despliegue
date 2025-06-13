import actividadSchema from '../models/actividad.js';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createActividadSchema, getActividadSchema, deleteActividadSchema } from '../validators/actividadValidator.js';

export const createActividad = [
    validatorHandler(createActividadSchema, "body"),
    async (req, res) => {
        try {
            const nuevaActividad = new actividadSchema(req.body);
            const data = await nuevaActividad.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
];

export const getActividad = async (req, res) => {
    try {
        const data = await actividadSchema.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getActividadById = [
    validatorHandler(getActividadSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const actividad = await actividadSchema.findById(id);
            if (!actividad) return res.status(404).json({ message: 'Actividad no encontrada' });
            res.json(actividad);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

export const deleteActividad = [
    validatorHandler(deleteActividadSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await actividadSchema.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Actividad no encontrada' });
            }
            res.json({ message: 'Actividad eliminada' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];