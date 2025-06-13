import hotelSchema from "../models/hotel.js";

// POST /api/hoteles
export const create = [
  async (req, res) => {
    try {
      // Incluye el nombre de archivo subido en el documento
      const nuevoHotel = new hotelSchema({
        ...req.body,
        imagen: req.file ? req.file.filename : ""
      });
      const data = await nuevoHotel.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// GET /api/hoteles
export const getAll = async (req, res) => {
  try {
    const data = await hotelSchema.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/hoteles/:id
export const getById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const hotel = await hotelSchema.findById(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// PUT /api/hoteles/:id
export const update = [
  async (req, res) => {
    const { id } = req.params;
    try {
      // Construye el objeto de actualización
      const campos = {
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        numeroHabitaciones: req.body.numeroHabitaciones,
        numeroPersonas: req.body.numeroPersonas,
        comida: req.body.comida,
        precio: req.body.precio,
        categoria: req.body.categoria
      };
      // Si se subió nueva imagen, actualiza ese campo también
      if (req.file) {
        campos.imagen = req.file.filename;
      }

      const hotelActualizado = await hotelSchema.findByIdAndUpdate(
        id,
        { $set: campos },
        { new: true }
      );

      if (!hotelActualizado) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }
      res.json(hotelActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// DELETE /api/hoteles/:id
export const remove = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await hotelSchema.findByIdAndDelete(id);
      if (!eliminado) {
        return res.status(404).json({ message: "Hotel eliminado correctamente" });
      }
      res.json({ message: "Hotel eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];
