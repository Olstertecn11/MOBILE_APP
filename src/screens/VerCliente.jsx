
import React, { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text, FlatList } from 'native-base';

const VerCliente = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      nombre: 'Luis Franco',
      direccion: '1 av 3-7',
      telefono: '22334567',
      vendedor: 'José Perez',
    },
    {
      id: 2,
      nombre: 'José Perez',
      direccion: '1 av 3-7',
      telefono: '22334567',
      vendedor: 'Sin vendedor asignado',
    },
  ]);

  const [selectedClient, setSelectedClient] = useState(null);

  const handleModifyClient = () => {
    // Modify client logic
    console.log('Modify client:', selectedClient);
  };

  const handleDeleteClient = () => {
    // Delete client logic
    console.log('Delete client:', selectedClient);
  };

  return (
    <Box flex={1} bg="#ECFFE6" p={4} alignItems="center">
      {/* Client Table */}
      <Box w="100%" bg="#fff" rounded="md" shadow={2}>
        <Text fontSize="lg" bold textAlign="center" mb={2} mt={2}>Usuarios</Text>

        {/* Table Header */}
        <HStack justifyContent="space-between" bg="#f0f0f0" p={2}>
          <Text bold flex={1}>Nombre</Text>
          <Text bold flex={1}>Dirección</Text>
          <Text bold flex={1}>Teléfono</Text>
          <Text bold flex={1}>Vendedor</Text>
        </HStack>

        {/* Table Body */}
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between" p={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Text flex={1}>{item.nombre}</Text>
              <Text flex={1}>{item.direccion}</Text>
              <Text flex={1}>{item.telefono}</Text>
              <Text flex={1}>{item.vendedor}</Text>
            </HStack>
          )}
        />
      </Box>

      {/* Input for selecting a client (just an example) */}
      <VStack space={4} mt={6} alignItems="center" w="100%">
        <Input
          variant="filled"
          placeholder="Nombre"
          w="80%"
          bg="#fff"
          value={selectedClient || ''}
          onChangeText={setSelectedClient}
        />

        {/* Buttons for modifying or deleting client */}
        <HStack space={4} w="80%" justifyContent="center">
          <Button
            colorScheme="yellow"
            flex={1}
            onPress={handleModifyClient}
          >
            Modificar
          </Button>
          <Button
            colorScheme="red"
            flex={1}
            onPress={handleDeleteClient}
          >
            Eliminar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VerCliente;
