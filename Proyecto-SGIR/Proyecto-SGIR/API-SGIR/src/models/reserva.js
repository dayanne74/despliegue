import mongoose from "mongoose";
const { Schema } = mongoose;

const reservaSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Asegúrate de que coincida con el nombre de tu modelo de usuarios
    required: true
  },
  destino: String,
  fechaSalida: Date,
  fechaRegreso: Date,
  id_hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  id_paquete: {
    type: Schema.Types.ObjectId,
    ref: 'Paquete'
  },
  id_excursion: {
    type: Schema.Types.ObjectId,
    ref: 'Excursion'
  },
  id_transporte: {
    type: Schema.Types.ObjectId,
    ref: 'Transporte'
  },
  id_comida: {
    type: Schema.Types.ObjectId,
    ref: 'Comida'
  },
  numeroContacto: String,
  cantidadPersonas: Number,
  precioTotal: Number,
  observaciones: String
}, {
  timestamps: true
});



export default mongoose.model('Reserva', reservaSchema);

