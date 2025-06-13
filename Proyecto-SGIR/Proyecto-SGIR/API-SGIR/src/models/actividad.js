import mongoose from 'mongoose';

const actividadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model('Actividad', actividadSchema);