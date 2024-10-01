
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Import FileSystem
import { createProduct } from '../../services/product'; // Import the product service

export default function AddProduct() {
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    semilla: '',
    cantidad: '',
    fechaIngreso: new Date(),
    precio: '',
    cuidados: '',
    descripcion: '',
    imagen: null, // This is for image URI to show preview
    imageBase64: null, // This is for base64 string to send in API request
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

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Set both the URI (for preview) and base64 (for API)
      const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setForm({
        ...form,
        imagen: result.assets[0].uri, // Set image URI for preview
        imageBase64: base64Image, // Set base64 for API submission
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        code: form.codigo,
        name: form.nombre,
        seed_type: form.semilla,
        quantity: form.cantidad,
        unit_price: form.precio,
        care_instructions: form.cuidados,
        description: form.descripcion,
        document_url: '',
        image: form.imageBase64, // Send the base64 image
      };

      const response = await createProduct(productData);
      console.log(response);

      if (response && response.success) {
        Alert.alert('Success', 'Product added successfully');
        setForm({
          codigo: '',
          nombre: '',
          semilla: '',
          cantidad: '',
          precio: '',
          cuidados: '',
          descripcion: '',
          imagen: null,
          imageBase64: null,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error adding the product');
      console.error(error);
    }
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

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Cuidados..."
        multiline={true}
        numberOfLines={4}
        value={form.cuidados}
        onChangeText={(value) => handleInputChange('cuidados', value)}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        multiline={true}
        numberOfLines={4}
        value={form.descripcion}
        onChangeText={(value) => handleInputChange('descripcion', value)}
      />

      <TouchableOpacity onPress={selectImage}>
        <Text style={styles.uploadText}>Subir imagen</Text>
      </TouchableOpacity>

      {form.imagen && (
        <Image
          source={{ uri: form.imagen }} // Show image preview
          style={styles.imagePreview}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
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
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginBottom: 15,
  },
});

