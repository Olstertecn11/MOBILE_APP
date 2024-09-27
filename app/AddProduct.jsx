import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddProduct() {
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    semilla: '',
    cantidad: '',
    precio: '',
    fechaIngreso: new Date(),
    cuidados: '',
    descripcion: '',
    imagen: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.fechaIngreso;
    setShowDatePicker(false);
    setForm({ ...form, fechaIngreso: currentDate });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={form.codigo}
        onChangeText={(value) => handleInputChange('codigo', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.nombre}
        onChangeText={(value) => handleInputChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Semilla"
        value={form.semilla}
        onChangeText={(value) => handleInputChange('semilla', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={form.cantidad}
        onChangeText={(value) => handleInputChange('cantidad', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio unitario"
        value={form.precio}
        onChangeText={(value) => handleInputChange('precio', value)}
      />

      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          {form.fechaIngreso ? form.fechaIngreso.toDateString() : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.fechaIngreso}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity>
        <Text style={styles.uploadText}>Subir documento</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        multiline={true}
        numberOfLines={4}
        value={form.descripcion}
        onChangeText={(value) => handleInputChange('descripcion', value)}
      />

      <TouchableOpacity>
        <Text style={styles.uploadText}>Subir imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>Agregar al inventario</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFFFE0', // Verde claro de fondo
    padding: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  datePickerButton: {
    width: '80%',
    padding: 15,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  datePickerText: {
    color: '#000000',
  },
  uploadText: {
    color: '#4CAF50',
    marginBottom: 15,
  },
  addButton: {
    width: '80%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

