
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Box, Button, Input, Text, VStack, FormControl, TextArea, ScrollView, Image } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const Container = styled.View`
  flex: 1;
  background: #ECFFE6;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 16px;
  color: #262A26;
  font-weight: bold;
  text-align: center;
`;

const IngInventario = () => {
  const [document, setDocument] = useState(null);
  const [image, setImage] = useState(null);

  const handleSelectDocument = () => {
    const options = {
      mediaType: 'mixed',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled document picker');
      } else if (response.errorCode) {
        console.log('Error:', response.errorMessage);
      } else {
        setDocument(response.assets[0]);
        console.log('Document selected:', response.assets[0]);
      }
    });
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error:', response.errorMessage);
      } else {
        setImage(response.assets[0]);
        console.log('Image selected:', response.assets[0]);
      }
    });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <VStack space={4} width="100%" px={4} py={6}>
          <FormControl>
            <FormControl.Label>Código</FormControl.Label>
            <Input placeholder="Código" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input placeholder="Nombre" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Semilla</FormControl.Label>
            <Input placeholder="Semilla" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Cantidad</FormControl.Label>
            <Input placeholder="Cantidad" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Precio unitario</FormControl.Label>
            <Input placeholder="Precio unitario" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Fecha de ingreso</FormControl.Label>
            <Input placeholder="Fecha de ingreso" />
          </FormControl>

          {/* Document Upload */}
          <FormControl>
            <FormControl.Label>Cuidados</FormControl.Label>
            <Button
              variant="link"
              colorScheme="green"
              leftIcon={<Icon name="document" size={20} />}
              onPress={handleSelectDocument}
            >
              {document ? document.fileName : 'Subir documento'}
            </Button>
          </FormControl>

          <FormControl>
            <FormControl.Label>Descripción</FormControl.Label>
            <TextArea h={20} placeholder="Descripción" />
          </FormControl>

          {/* Image Upload with Preview */}
          <FormControl>
            <FormControl.Label>Imagen</FormControl.Label>
            <Button
              variant="link"
              colorScheme="green"
              leftIcon={<Icon name="image" size={20} />}
              onPress={handleSelectImage}
            >
              {image ? image.fileName : 'Subir imagen'}
            </Button>

            {/* Image Preview */}
            {image && (
              <Box mt={4} alignItems="center">
                <Image
                  source={{ uri: image.uri }}
                  alt="Selected Image"
                  size="2xl"
                  resizeMode="cover"
                  borderRadius={10}
                />
              </Box>
            )}
          </FormControl>

          <Button mt={4} colorScheme="green">
            Agregar al inventario
          </Button>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default IngInventario;

