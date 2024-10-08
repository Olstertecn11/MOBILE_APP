
import React, { useState } from 'react';
import { Modal, Button, VStack, Image, Text, Input, TouchableOpacity, ScrollView } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { updateProduct } from '../services/product';

const ViewProduct = ({ isOpen, onClose, product, refreshInventory }) => {
  const [form, setForm] = useState({
    name: product?.name || '',
    quantity: product?.quantity || '',
    unit_price: product?.unit_price || '',
    imageBase64: product?.image || null,
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
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
      const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setForm({
        ...form,
        imageBase64: base64Image,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...product,
        name: form.name,
        quantity: form.quantity,
        unit_price: form.unit_price,
        image: form.imageBase64,
      };

      const response = await updateProduct(product.id, updatedProduct);
      if (response && response.success) {
        alert('Producto actualizado con éxito');
        refreshInventory();
        onClose();
      }
    } catch (error) {
      console.error('Error actualizando el producto:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Modificar Producto</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={4} alignItems="center">
              <Input
                placeholder="Nombre del producto"
                value={form.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
              <Input
                placeholder="Cantidad"
                value={form.quantity}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('quantity', value)}
              />
              <Input
                placeholder="Precio Unitario"
                value={form.unit_price}
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange('unit_price', value)}
              />
              <TouchableOpacity onPress={selectImage}>
                <Text style={{ color: 'green', marginBottom: 10 }}>Cambiar Imagen</Text>
              </TouchableOpacity>
              {form.imageBase64 && (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${form.imageBase64}` }}
                  alt="Imagen del producto"
                  size="2xl"
                  borderRadius={10}
                />
              )}
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={handleUpdate} colorScheme="green">
            Guardar Cambios
          </Button>
          <Button onPress={onClose} ml={3}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewProduct;

