
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (username === 'olster' && password === 'daniela11') {
      router.replace('/Home');
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
      </View>

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.showPasswordButton}
      >
        <Text style={styles.showPasswordText}>
          {showPassword ? 'Ocultar Contraseña' : 'Ver Contraseña'}
        </Text>
      </TouchableOpacity>

      {/* Botón de ingresar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#efffe0',
    paddingTop: '50%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,  // Ajustado el margen para que el botón de "Ver" esté más cerca
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordButton: {
    width: '80%',  // Para asegurarte de que ocupe el ancho del input
    alignItems: 'flex-end',  // Alinear el texto "Ver" a la derecha
    marginBottom: 15,  // Añadir un pequeño margen debajo
    marginRight: 20
  },
  showPasswordText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSecondary: {
    width: '80%',
    backgroundColor: '#6fcf97',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

