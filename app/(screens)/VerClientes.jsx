
import React, { useState, useEffect } from 'react';
import { Box, Button, Text, FlatList, HStack, useToast, Actionsheet, useDisclose, Input, VStack } from 'native-base';
import { getAllclient } from '../../services/client';
import { useIsFocused } from '@react-navigation/native';
import ViewClient from '../../components/ViewClient';
import { deleteClient } from '../../services/client';

const VerClientes = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const toast = useToast();
  const isFocused = useIsFocused();
  const { isOpen, onOpen, onClose } = useDisclose();

  const fetchClients = async () => {
    try {
      const response = await getAllclient();
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
  useEffect(() => {

    if (isFocused) fetchClients();
  }, [isFocused]);

  const handleAction = async (action) => {
    if (action === 'visualizar') {
      setIsViewModalOpen(true);
    } else if (action === 'modificar') {
      toast.show({ description: 'Modificar cliente', bgColor: 'yellow.500' });
    } else if (action === 'eliminar') {
      const r = await deleteClient(selectedClient.id);
      console.log(r);
      if (r.status == 200 || r.status === 200) {
        fetchClients();
        toast.show({ description: 'Eliminar cliente', bgColor: 'red.500' });
        onClose();
        return;
      }
      toast.show({ description: 'Error al eliminar cliente', bgColor: 'red.500' });
    }
    onClose();
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
      <Box w="100%" bg="#fff" rounded="md" shadow={2}>
        <Text fontSize="lg" bold textAlign="center" mb={2} mt={2}>Clientes</Text>

        <HStack justifyContent="space-between" bg="#f0f0f0" p={2}>
          <Text bold flex={1}>Nombre</Text>
          <Text bold flex={1}>Dirección</Text>
          <Text bold flex={1}>Teléfono</Text>
          <Text bold flex={1}>Vendedor</Text>
        </HStack>

        <FlatList
          data={clients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between" p={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Text flex={1}>{item.name}</Text>
              <Text flex={1}>{item.address}</Text>
              <Text flex={1}>{item.phone}</Text>
              <Text flex={1}>{item.assigned_seller || 'Sin vendedor asignado'}</Text>
              <Text textAlign='center' flex={1} onPress={() => { setSelectedClient(item); onOpen(); }}>
                ...
              </Text>
            </HStack>
          )}
        />
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => handleAction('visualizar')}>Visualizar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleAction('modificar')}>Modificar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleAction('eliminar')}>Eliminar</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {selectedClient && (
        <ViewClient
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          client={selectedClient}
        />
      )}
    </Box>
  );
};

export default VerClientes;

