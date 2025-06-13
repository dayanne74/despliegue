import express from 'express';
import reservaSchema from '../models/reserva.js';
import Usuario from '../models/Usuario.js'; // Añade esta importación
import Hotel from '../models/hotel.js';    // Añade estas importaciones
import Paquete from '../models/paquete.js';
import Excursion from '../models/excursion.js';




const router = express.Router();
router.get('/form-data', async (req, res) => {
  try {
    const [usuarios, hoteles, paquetes, excursiones] = await Promise.all([
      Usuario.find().select('nombre apellido _id'), // Solo los campos necesarios
      Hotel.find().select('nombre _id'),
      Paquete.find().select('nombre _id'),
      Excursion.find().select('nombre _id'),
      
    ]);
    
    res.json({ 
      usuarios, 
      hoteles, 
      paquetes, 
      excursiones, 
    });
  } catch (error) {
    console.error('Error en /form-data:', error);
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Crear nueva reserva
router.post('/', async (req, res) => {
  try {
    const nuevaReserva = new reservaSchema(req.body);
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await reservaSchema.find()
      .populate('cliente')
      .populate('id_hotel')
      .populate('id_paquete')
      .populate('id_excursion')
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener datos para formulario
router.get('/form-data', async (req, res) => {
  try {
    const [usuarios, hoteles, paquetes, excursiones,  comidas] = await Promise.all([
      Usuario.find(),
      Hotel.find(),
      Paquete.find(),
      Excursion.find(),
      
      
    ]);
    
    res.json({ usuarios, hoteles, paquetes, excursiones, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;