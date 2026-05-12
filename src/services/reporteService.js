import api from './api';

const reporteService = {
    // 1. Crear un Nuevo Reporte
    crearReporte: async (datos) => {
        try {
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
    },

    // 3. Modificar Estado del Reporte (Solo ADMIN o FUNCIONARIO)
    cambiarEstado: async (id, nuevoEstado) => {
        try {
            const response = await api.put(`/reportes/${id}/estado`, { estado: nuevoEstado });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al cambiar el estado del reporte");
        }
    },

    // 4. Eliminar un Reporte (Solo ADMIN o FUNCIONARIO)
    eliminarReporte: async (id) => {
        try {
            const response = await api.delete(`/reportes/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al eliminar el reporte");
        }
    }
};

export default reporteService;
