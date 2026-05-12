import api from './api';

const adminService = {
    // 4. Cambiar Rol de un Usuario (Panel de Admin)
    cambiarRolUsuario: async (id, nuevoRol) => {
        try {
            const response = await api.put(`/admin/usuarios/${id}/rol`, { nuevoRol });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al cambiar el rol del usuario");
        }
    }
};

export default adminService;
