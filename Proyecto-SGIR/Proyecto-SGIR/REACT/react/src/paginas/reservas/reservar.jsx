import React, { useState, useEffect } from 'react';
import { createReserva, getFormData } from '../../../services/reservaService';

const ReservaForm = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: '',
    id_hotel: '',
    id_paquete: '',
    id_excursion: '',
    
    numeroContacto: '',
    cantidadPersonas: 1,
    
    observaciones: ''
  });

  const [options, setOptions] = useState({
    usuarios: [],
    hoteles: [],
    paquetes: [],
    excursiones: [],
    transportes: [],
    comidas: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
  try {
    const data = await getFormData();
    setOptions(data);
  } catch (err) {
    setError(err.message || 'Error al cargar los datos del formulario');
    console.error('Error details:', err);
  } finally {
    setLoading(false);
  }
};

    fetchFormData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createReserva(formData);
      setSuccess(true);
      // Reset form
      setFormData({
        cliente: '',
        destino: '',
        fechaSalida: '',
        fechaRegreso: '',
        id_hotel: '',
        id_paquete: '',
        id_excursion: '',
        numeroContacto: '',
        cantidadPersonas: 1,
        precioTotal: 0,
        observaciones: ''
      });
    } catch (err) {
      setError(err.message || 'Error al crear la reserva');
    }
  };

  if (loading) return <div>Cargando formulario...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nueva Reserva</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Reserva creada exitosamente!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Cliente */}
          <div className="col-md-6 mb-3">
            <label htmlFor="cliente" className="form-label">Cliente *</label>
            <select
              className="form-select"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un cliente</option>
              {options.usuarios.map(usuario => (
                <option key={usuario._id} value={usuario._id}>
                  {usuario.nombre} {usuario.apellido}
                </option>
              ))}
            </select>
          </div>
          
          {/* Destino */}
          <div className="col-md-6 mb-3">
            <label htmlFor="destino" className="form-label">Destino *</label>
            <input
              type="text"
              className="form-control"
              id="destino"
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="row">
          {/* Fechas */}
          <div className="col-md-6 mb-3">
            <label htmlFor="fechaSalida" className="form-label">Fecha de Salida *</label>
            <input
              type="date"
              className="form-control"
              id="fechaSalida"
              name="fechaSalida"
              value={formData.fechaSalida}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="fechaRegreso" className="form-label">Fecha de Regreso *</label>
            <input
              type="date"
              className="form-control"
              id="fechaRegreso"
              name="fechaRegreso"
              value={formData.fechaRegreso}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="row">
          {/* Hotel */}
          <div className="col-md-4 mb-3">
            <label htmlFor="id_hotel" className="form-label">Hotel</label>
            <select
              className="form-select"
              id="id_hotel"
              name="id_hotel"
              value={formData.id_hotel}
              onChange={handleChange}
            >
              <option value="">Seleccione un hotel</option>
              {options.hoteles.map(hotel => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.nombre}
                </option>
              ))}
            </select>
          </div>
          
          {/* Paquete */}
          <div className="col-md-4 mb-3">
            <label htmlFor="id_paquete" className="form-label">Paquete</label>
            <select
              className="form-select"
              id="id_paquete"
              name="id_paquete"
              value={formData.id_paquete}
              onChange={handleChange}
            >
              <option value="">Seleccione un paquete</option>
              {options.paquetes.map(paquete => (
                <option key={paquete._id} value={paquete._id}>
                  {paquete.nombre}
                </option>
              ))}
            </select>
          </div>
          
          {/* Excursión */}
          <div className="col-md-4 mb-3">
            <label htmlFor="id_excursion" className="form-label">Excursión</label>
            <select
              className="form-select"
              id="id_excursion"
              name="id_excursion"
              value={formData.id_excursion}
              onChange={handleChange}
            >
              <option value="">Seleccione una excursión</option>
              {options.excursiones.map(excursion => (
                <option key={excursion._id} value={excursion._id}>
                  {excursion.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        
        
        <div className="row">
          {/* Contacto y Personas */}
          <div className="col-md-6 mb-3">
            <label htmlFor="numeroContacto" className="form-label">Número de Contacto *</label>
            <input
              type="tel"
              className="form-control"
              id="numeroContacto"
              name="numeroContacto"
              value={formData.numeroContacto}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="col-md-3 mb-3">
            <label htmlFor="cantidadPersonas" className="form-label">Personas *</label>
            <input
              type="number"
              className="form-control"
              id="cantidadPersonas"
              name="cantidadPersonas"
              min="1"
              value={formData.cantidadPersonas}
              onChange={handleChange}
              required
            />
          </div>
          
          
        </div>
        
        {/* Observaciones */}
        <div className="mb-3">
          <label htmlFor="observaciones" className="form-label">Observaciones</label>
          <textarea
            className="form-control"
            id="observaciones"
            name="observaciones"
            rows="3"
            value={formData.observaciones}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Guardar Reserva</button>
      </form>
    </div>
  );
};

export default ReservaForm;