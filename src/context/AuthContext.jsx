import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Crear el Contexto
export const AuthContext = createContext();

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de Autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Cargar los datos de autenticación desde AsyncStorage al inicio
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userID');
        const storedToken = await AsyncStorage.getItem('userToken');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser).userID);
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al cargar los datos de autenticación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Función para iniciar sesión
  const login = async (userID, authToken) => {
    try {
      setUser(userID);
      setToken(authToken);
      setIsAuthenticated(true);
      await AsyncStorage.setItem('userID', JSON.stringify({ userID }));
      await AsyncStorage.setItem('userToken', authToken);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      await AsyncStorage.removeItem('userID');
      await AsyncStorage.removeItem('userToken');
      router.replace('/login');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
