import api from './api';

const reporteService = {
    // 1. Crear un Nuevo Reporte
    crearReporte: async (datos) => {
        try {
            // El interceptor en api.js inyectará automáticamente el token JWT
            const response = await api.post('/reportes', datos);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al crear el reporte");
        }
    },

    // 2. Obtener Todos los Reportes
    listarReportes: async () => {
        try {
            const response = await api.get('/reportes');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al obtener los reportes");
        }
    }
};

export default reporteService;
