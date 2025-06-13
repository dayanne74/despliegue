import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const getFormData = async () => {
  const res = await axios.get(`${API_URL}/form-data`);
  return res.data;
};

export const getReservas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createReserva = async (reserva) => {
  const res = await axios.post(API_URL, reserva);
  return res.data;
};

export const updateReserva = async (id, reserva) => {
  const res = await axios.put(`${API_URL}/${id}`, reserva);
  return res.data;
};

export const deleteReserva = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};