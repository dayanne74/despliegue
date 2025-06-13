import Paquete from "../models/paquete.js";

export const create = async (req, res) => {
  try {
    const nuevoPaquete = new Paquete(req.body);
    await nuevoPaquete.save();
    res.status(201).json({ mensaje: 'Paquete creado correctamente' });
  } catch (error) {
    console.error('❌ Error al crear paquete:', error);
    res.status(500).json({
      mensaje: 'Error interno del servidor',
      error: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await Paquete.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = [
  async (req, res) => {
    try {
      const paquete = await Paquete.findById(req.params.id);
      if (!paquete) return res.status(404).json({ message: "Paquete no encontrado" });
      res.json(paquete);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const update = [
  async (req, res) => {
    try {
      const campos = {
        ...req.body,
        imagen: req.file ? req.file.filename : undefined
      };

      const paqueteActualizado = await Paquete.findByIdAndUpdate(
        req.params.id,
        { $set: campos },
        { new: true }
      );

      if (!paqueteActualizado)
        return res.status(404).json({ message: "Paquete no encontrado" });

      res.json(paqueteActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const remove = [
  async (req, res) => {
    try {
      const eliminado = await Paquete.findByIdAndDelete(req.params.id);
      if (!eliminado)
        return res.status(404).json({ message: "Paquete no encontrado" });

      res.json({ message: "Paquete eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
export const buscarPorDestino = async (req, res) => {
  try {
    const { destino } = req.query;
    if (!destino) {
      return res.status(400).json({ message: "Destino no proporcionado" });
    }

    const paquetes = await Paquete.find({
      destino: { $regex: new RegExp(destino, 'i') }, // búsqueda insensible a mayúsculas
    });

    if (!paquetes.length) {
      return res.status(404).json({ message: "No se encontraron paquetes para este destino" });
    }

    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /api/paquetes/estado?activo=true
export const filtrarPorEstado = async (req, res) => {
  try {
    const { activo } = req.query;
    if (activo !== 'true' && activo !== 'false') {
      return res.status(400).json({ message: "El parámetro 'activo' debe ser true o false" });
    }

    const paquetes = await Paquete.find({ activo: activo === 'true' });

    if (!paquetes.length) {
      return res.status(404).json({ message: "No se encontraron paquetes con ese estado" });
    }

    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
