import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from 'native-base';

const IngCliente = () => {
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [vendedorAsignado, setVendedorAsignado] = useState('');

  const handleAgregarCliente = () => {
    console.log({
      direccion,
      nombre,
      telefono,
      vendedorAsignado,
    });
  };

  return (
    <Box flex={1} bg="#ECFFE6" alignItems="center" justifyContent="center">
      <VStack space={4} alignItems="center" w="80%">

        <Text fontSize="lg" bold mb="4">Agregar cliente</Text>

        {/* Dirección Input */}
        <Input
          variant="filled"
          placeholder="Dirección"
          w="100%"
          bg="#fff"
          value={direccion}
          onChangeText={setDireccion}
        />

        {/* Nombre Input */}
        <Input
          variant="filled"
          placeholder="Nombre"
          w="100%"
          bg="#fff"
          value={nombre}
          onChangeText={setNombre}
        />

        {/* Teléfono Input */}
        <Input
          variant="filled"
          placeholder="Teléfono"
          w="100%"
          bg="#fff"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        {/* Vendedor Asignado Input */}
        <Input
          variant="filled"
          placeholder="Vendedor asignado"
          w="100%"
          bg="#fff"
          value={vendedorAsignado}
          onChangeText={setVendedorAsignado}
        />

        {/* Agregar Cliente Button */}
        <Button mt="5" colorScheme="green" onPress={handleAgregarCliente}>
          Agregar cliente
        </Button>
      </VStack>
    </Box>
  );
};

export default IngCliente;
