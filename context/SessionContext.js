
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    try {
      const _user = await AsyncStorage.getItem('user');
      const _token = await AsyncStorage.getItem('token');
      if (_user && _token) {
        setUser(JSON.parse(_user));
        setToken(_token);
      }
    } catch (error) {
      console.error('Error al cargar la sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async (user, token) => {
    try {
      const r1 = await AsyncStorage.setItem('user', JSON.stringify(user));
      const r2 = await AsyncStorage.setItem('token', token);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, token, saveSession, clearSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

