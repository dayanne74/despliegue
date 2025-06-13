import React, { useState, useEffect } from 'react';
import {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
  getFormData
} from '../../../services/reservaService';

const ReservaCrud = () => {
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
    precioTotal: 0,
    observaciones: ''
  });

  const [options, setOptions] = useState({
    usuarios: [],
    hoteles: [],
    paquetes: [],
    excursiones: [],
  });

  const [reservas, setReservas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [formOptions, allReservas] = await Promise.all([
        getFormData(),
        getReservas()
      ]);
      setOptions(formOptions);
      setReservas(allReservas);
    } catch (err) {
      setError('Error al cargar los datos');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateReserva(currentId, formData);
      } else {
        await createReserva(formData);
      }
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
      setEditMode(false);
      setCurrentId(null);
      fetchData();
    } catch (err) {
      setError('Error al guardar la reserva');
    }
  };

  const handleEdit = (reserva) => {
    setFormData(reserva);
    setCurrentId(reserva._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Desea eliminar esta reserva?')) {
      await deleteReserva(id);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">{editMode ? 'Editar Reserva' : 'Nueva Reserva'}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        {/* Aquí puedes reusar los mismos campos del formulario anterior */}
        {/* Por ejemplo: */}
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Cliente</label>
            <select
              name="cliente"
              className="form-select"
              value={formData.cliente}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              {options.usuarios.map(u => (
                <option key={u._id} value={u._id}>{u.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Destino</label>
            <input
              type="text"
              className="form-control"
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Puedes seguir agregando el resto de los campos aquí... */}

        <button type="submit" className="btn btn-success mt-3">
          {editMode ? 'Actualizar' : 'Guardar'}
        </button>
      </form>

      <h4>Lista de Reservas</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Salida</th>
            <th>Regreso</th>
            <th>Personas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(res => (
            <tr key={res._id}>
              <td>{res.cliente?.nombre || 'N/A'}</td>
              <td>{res.destino}</td>
              <td>{new Date(res.fechaSalida).toLocaleDateString()}</td>
              <td>{new Date(res.fechaRegreso).toLocaleDateString()}</td>
              <td>{res.cantidadPersonas}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(res)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(res._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservaCrud;
