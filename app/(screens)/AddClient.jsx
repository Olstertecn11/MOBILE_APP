

import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, HStack, IconButton, useToast, CloseIcon } from 'native-base';
import { createClient } from '../../services/client';

const IngCliente = () => {
  const [direccion, setDireccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [vendedorAsignado, setVendedorAsignado] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const showCustomToast = (message, bgColor) => {
    toast.show({
      placement: "top-right",
      duration: 3000,
      render: () => {
        return (
          <Box bg={bgColor} px="4" py="2" rounded="md" mb={5}>
            <HStack space={2} justifyContent="space-between" alignItems="center">
              <Text color="white" fontWeight="bold">
                {message}
              </Text>
              <IconButton icon={<CloseIcon size="xs" color="white" />} onPress={() => toast.closeAll()} />
            </HStack>
          </Box>
        );
      },
    });
  };

  const handleAgregarCliente = async () => {
    if (!direccion || !nombre || !telefono || !vendedorAsignado) {
      showCustomToast("Todos los campos son obligatorios", "red.500");
      return;
    }

    setLoading(true);

    try {
      const clientData = {
        address: direccion,
        name: nombre,
        phone: telefono,
        assigned_seller: vendedorAsignado,
      };

      console.log(clientData);
      const response = await createClient(clientData);
      console.log(response);
      if (response.status === 201) {
        showCustomToast("Cliente agregado exitosamente", "green.500");
        setDireccion('');
        setNombre('');
        setTelefono('');
        setVendedorAsignado('');
      } else {
        showCustomToast("Error al agregar el cliente", "red.500");
      }
    } catch (error) {
      showCustomToast("Error al agregar el cliente", "red.500");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="#ECFFE6" alignItems="center" paddingTop={10} >
      <VStack space={4} alignItems="center" w="80%">
        <Text fontSize="lg" bold mb="4">Agregar cliente</Text>
        <Input
          variant="filled"
          placeholder="Dirección"
          w="100%"
          bg="#fff"
          value={direccion}
          onChangeText={setDireccion}
        />

        <Input
          variant="filled"
          placeholder="Nombre"
          w="100%"
          bg="#fff"
          value={nombre}
          onChangeText={setNombre}
        />

        <Input
          variant="filled"
          placeholder="Teléfono"
          w="100%"
          bg="#fff"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Input
          variant="filled"
          placeholder="Vendedor asignado"
          w="100%"
          bg="#fff"
          value={vendedorAsignado}
          onChangeText={setVendedorAsignado}
        />

        <Button
          mt="5"
          colorScheme="green"
          isLoading={loading}
          onPress={handleAgregarCliente}
        >
          Agregar cliente
        </Button>
      </VStack>
    </Box>
  );
};

export default IngCliente;

