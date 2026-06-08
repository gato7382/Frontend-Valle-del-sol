import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efecto que corre al cargar la app para verificar si hay sesión activa
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Verificar si el token es válido contra el backend
                const userData = await authService.verifySession();
                setUser(userData);
            } catch (err) {
                // Si da error (ej. 401 o 403), el token es inválido o expiró
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const data = await authService.login({ email, password });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (nombre, email, password) => {
        setError(null);
        try {
            const data = await authService.register({ nombre, email, password });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
