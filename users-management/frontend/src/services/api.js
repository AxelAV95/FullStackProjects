import axios from 'axios';

// Para desarrollo: http://localhost:3001/api
// Para producción (Docker): /api (ruta relativa)
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

export const usuariosAPI = {
  obtenerTodos: () => api.get('/usuarios'),
  obtenerPorId: (id) => api.get(`/usuarios/${id}`),
  crear: (usuario) => api.post('/usuarios', usuario),
  actualizar: (id, usuario) => api.put(`/usuarios/${id}`, usuario),
  eliminar: (id) => api.delete(`/usuarios/${id}`),
};

export const healthAPI = {
  verificar: () => api.get('/health')
};

export default api;