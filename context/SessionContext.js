
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

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
        let parsedUser = JSON.parse(_user);

        if (parsedUser.imageUri) {
          const imageUri = parsedUser.imageUri;
          parsedUser.image = imageUri;
        }

        setUser(parsedUser);
        setToken(_token);
      }
    } catch (error) {
      console.error('Error al cargar la sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveImageToFileSystem = async (base64Image) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}profile_image.png`;
      await FileSystem.writeAsStringAsync(fileUri, base64Image, { encoding: FileSystem.EncodingType.Base64 });
      return fileUri;
    } catch (error) {
      console.error('Error al guardar la imagen en el sistema de archivos:', error);
      return null;
    }
  };

  const saveSession = async (user, token) => {
    try {
      let imageUri = null;

      if (user.image) {
        imageUri = await saveImageToFileSystem(user.image);
        user.imageUri = imageUri;
        delete user.image;
      }

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);

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

