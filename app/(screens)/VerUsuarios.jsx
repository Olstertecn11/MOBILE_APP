
import React, { useState, useEffect } from 'react';
import { Box, Button, Text, FlatList, HStack, useToast, Actionsheet, useDisclose } from 'native-base';
import { getAllusers, deleteUser } from '../../services/user';
import { useIsFocused } from '@react-navigation/native';
import ViewUser from '../../components/ViewUser';

const VerUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const toast = useToast();
  const isFocused = useIsFocused();
  const { isOpen, onOpen, onClose } = useDisclose();

  const fetchUsers = async () => {
    try {
      const response = await getAllusers();
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setError('Error fetching users');
      }
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    if (isFocused) fetchUsers();
  }, [isFocused]);

  const handleAction = async (action) => {
    if (action === 'visualizar') {
      setIsViewModalOpen(true);
    } else if (action === 'editar') {
      toast.show({ description: 'Editar usuario', bgColor: 'yellow.500' });
    } else if (action === 'eliminar') {
      const resp = await deleteUser(selectedUser.id);
      console.log(resp);
      if (resp.status === 200 || resp.status == 200) {
        fetchUsers();
      }
      toast.show({ description: 'Eliminar usuario', bgColor: 'red.500' });
    }
    onClose();
  };

  if (loading) {
    return (
      <Box flex={1} bg="#ECFFE6" alignItems="center" justifyContent="center">
        <Text>Cargando usuarios...</Text>
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
        <Text fontSize="lg" bold textAlign="center" mb={2} mt={2}>Usuarios</Text>

        <HStack justifyContent="space-between" bg="#f0f0f0" p={2}>
          <Text bold textAlign="center" flex={1}>Nombre</Text>
          <Text bold textAlign="center" flex={1}>Rol</Text>
          <Text bold textAlign="center" flex={1}>Acciones</Text>
        </HStack>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between" p={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Text textAlign='center' flex={1}>{item.username}</Text>
              <Text textAlign='center' flex={1}>{item.role_id === 1 ? 'Administrador' : 'Vendedor'}</Text>
              <Text textAlign='center' flex={1} onPress={() => { setSelectedUser(item); onOpen(); }}>
                ...
              </Text>
            </HStack>
          )}
        />
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => handleAction('visualizar')}>Visualizar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleAction('editar')}>Editar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleAction('eliminar')}>Eliminar</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {selectedUser && (
        <ViewUser
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          user={selectedUser}
        />
      )}
    </Box>
  );
};

export default VerUsuarios;

