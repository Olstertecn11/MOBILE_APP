
import React, { useState, useEffect } from 'react';
import { Box, Button, Text, FlatList, HStack, useToast, Actionsheet, useDisclose, Input, VStack } from 'native-base';
import { getAllclient } from '../../services/client';
import { useIsFocused } from '@react-navigation/native';
import ViewClient from '../../components/ViewClient';
import { deleteClient } from '../../services/client';
import AntDesign from '@expo/vector-icons/AntDesign';

const VerClientes = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchText, setSearchText] = useState('');
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
      if (response.status === 200) {
        setClients(response.data);
        setFilteredClients(response.data);
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

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(text.toLowerCase()) ||
      client.phone.includes(text)
    );
    setFilteredClients(filtered);
  };

  const handleAction = async (action) => {
    if (action === 'visualizar') {
      setIsViewModalOpen(true);
    } else if (action === 'modificar') {
      toast.show({ description: 'Modificar cliente', bgColor: 'yellow.500' });
    } else if (action === 'eliminar') {
      const r = await deleteClient(selectedClient.id);
      if (r.status === 200) {
        fetchClients();
        toast.show({ description: 'Eliminar cliente', bgColor: 'red.500' });
        onClose();
        return;
      }
      toast.show({ description: 'Error al eliminar cliente', bgColor: 'red.500' });
    }
    onClose();
  };

  const selectClientAndOpenActionsheet = (client) => {
    setSelectedClient(client); // Asegura que seleccionas el cliente correcto
    onOpen();
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
      <Box w='100%'>
        <HStack justifyContent="space-between" w="100%">
          <Input
            placeholder='Buscar...'
            w='80%'
            value={searchText}
            onChangeText={handleSearch}
          />
          <Button bg='green.500'><AntDesign name="search1" size={24} color="white" /></Button>
        </HStack>
      </Box>
      <Box w="100%" bg="#fff" rounded="md" shadow={2} mt={6}>
        <Text fontSize="lg" bold textAlign="center" mb={2} mt={2} bg='green.600' color='white'>Clientes</Text>
        <HStack justifyContent="space-between" bg="#f0f0f0" p={2}>
          <Text bold textAlign="center" flex={1}>Nombre</Text>
          <Text bold textAlign="center" flex={1}>Teléfono</Text>
          <Text bold textAlign="center" flex={1}>Acciones</Text>
        </HStack>

        <FlatList
          data={filteredClients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between" p={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Text textAlign='center' flex={1}>{item.name}</Text>
              <Text textAlign='center' flex={1}>{item.phone}</Text>
              <Text textAlign='center' flex={1} onPress={() => selectClientAndOpenActionsheet(item)}>
                ...
              </Text>
            </HStack>
          )}
        />
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => handleAction('visualizar')}>{selectedClient && (selectedClient.name)}Visualizar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleAction('eliminar')}>Eliminar</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {selectedClient && (
        <ViewClient
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          update={() => fetchClients()}
          client={selectedClient}
        />
      )}
    </Box>
  );
};

export default VerClientes;

