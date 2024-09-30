import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddClient = () => {
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [vendedorAsignado, setVendedorAsignado] = useState('');

  const handleAddClient = () => {
    console.log(`Dirección: ${direccion}, Nombre: ${nombre}, Teléfono: ${telefono}, Vendedor: ${vendedorAsignado}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Dirección"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Teléfono"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Vendedor asignado</Text>
        <TextInput
          style={styles.input}
          value={vendedorAsignado}
          onChangeText={setVendedorAsignado}
          placeholder="Vendedor asignado"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddClient}>
        <Text style={styles.buttonText}>Agregar cliente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFFFE0',
    padding: 16,
  },
  formGroup: {
    width: '80%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#7A7A7A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddClient;

