
import React from 'react';
import styled from 'styled-components/native';
import { Box, Button, Input, Text, VStack, FormControl, TextArea, ScrollView } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

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

const IngInventario = () => (
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

        <FormControl>
          <FormControl.Label>Cuidados</FormControl.Label>
          <Button variant="link" colorScheme="green" leftIcon={<Icon name="document" size={20} />}>
            Subir documento
          </Button>
        </FormControl>

        <FormControl>
          <FormControl.Label>Descripción</FormControl.Label>
          <TextArea h={20} placeholder="Descripción" />
        </FormControl>

        <FormControl>
          <FormControl.Label>Imagen</FormControl.Label>
          <Button variant="link" colorScheme="green" leftIcon={<Icon name="image" size={20} />}>
            Subir imagen
          </Button>
        </FormControl>

        <Button mt={4} colorScheme="green">
          Agregar al inventario
        </Button>
      </VStack>
    </ScrollView>
  </Container>
);

export default IngInventario;

