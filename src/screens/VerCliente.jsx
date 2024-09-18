
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Text, FlatList } from 'native-base';
import { getAllclient } from '../services/client';

const VerCliente = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllclient();
        console.log(response.data);
        if (response.status == 200) {
          setClients(response.data);
        } else {
          setError('Error fetching clients');
        }
      } catch (err) {
        setError('Error fetching clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleModifyClient = () => {
    console.log('Modify client:', selectedClient);
  };

  const handleDeleteClient = () => {
    console.log('Delete client:', selectedClient);
  };

  if (loading) {
    return (
      <Box flex={1} bg="#ECFFE6" alignItems="center" justifyContent="center">
        <Text>Cargando clientes...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} bg="#ECFFE6" alignItems="center" justifyContent="center">
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

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
              <Text flex={1}>{item.name}</Text>
              <Text flex={1}>{item.address}</Text>
              <Text flex={1}>{item.phone}</Text>
              <Text flex={1}>{item.assigned_seller || 'Sin vendedor asignado'}</Text>
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

