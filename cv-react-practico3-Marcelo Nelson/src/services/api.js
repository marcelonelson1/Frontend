import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de request - agrega el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('📤 Request:', config.method.toUpperCase(), config.url);

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de response - maneja las respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('❌ Response Error:', error.response.status, error.response.data);

      // Si es 401, podríamos redirigir al login
      if (error.response.status === 401) {
        console.log('🔒 Unauthorized - redirigiendo al login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('❌ No response received:', error.request);
    } else {
      // Algo sucedió en la configuración de la petición
      console.error('❌ Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Funciones de servicio para usuarios
export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
};

export default api;
