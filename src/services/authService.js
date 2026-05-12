import api from './api';

const authService = {
    // 1. Registro (Sign Up)
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 409) {
                throw new Error("Correo ya registrado");
            }
            throw new Error(error.response?.data?.message || "Error al registrar usuario");
        }
    },

    // 2. Inicio de Sesión (Login)
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error("Credenciales incorrectas");
            }
            throw new Error(error.response?.data?.message || "Error al iniciar sesión");
        }
    },

    // 3. Verificar Sesión (Me)
    verifySession: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;
