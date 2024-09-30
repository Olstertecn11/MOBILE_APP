

import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, Text, FlatList, useToast } from 'native-base';
import { getAllusers } from '../../services/user';
import { useIsFocused } from '@react-navigation/native';

const VerUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const isFocused = useIsFocused();

  useEffect(() => {
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

    if (isFocused) fetchUsers();
  }, [isFocused]);

  const handleModifyUser = () => {
    console.log('Modify user:', selectedUser);
    toast.show({
      description: 'Modify user functionality not implemented',
      bgColor: 'yellow.500'
    });
  };

  const handleDeleteUser = () => {
    console.log('Delete user:', selectedUser);
    toast.show({
      description: 'Delete user functionality not implemented',
      bgColor: 'red.500'
    });
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
      {/* User Table */}
      <Box w="100%" bg="#fff" rounded="md" shadow={2}>
        <Text fontSize="lg" bold textAlign="center" mb={2} mt={2}>Usuarios</Text>

        {/* Table Header */}
        <HStack justifyContent="space-between" bg="#f0f0f0" p={2}>
          <Text bold flex={1}>Nombre</Text>
          <Text bold flex={1}>Email</Text>
          <Text bold flex={1}>Rol</Text>
        </HStack>

        {/* Table Body */}
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between" p={2} borderBottomWidth={1} borderBottomColor="gray.200">
              <Text flex={1}>{item.username}</Text>
              <Text flex={1}>{item.email}</Text>
              <Text flex={1}>{item.role_id === 1 ? 'Administrador' : 'Vendedor'}</Text>
            </HStack>
          )}
        />
      </Box>

      <VStack space={4} mt={6} alignItems="center" w="100%">
        <Input
          variant="filled"
          placeholder="Nombre de usuario"
          w="80%"
          bg="#fff"
          value={selectedUser || ''}
          onChangeText={setSelectedUser}
        />

        <HStack space={4} w="80%" justifyContent="center">
          <Button
            colorScheme="yellow"
            flex={1}
            onPress={handleModifyUser}
          >
            Modificar
          </Button>
          <Button
            colorScheme="red"
            flex={1}
            onPress={handleDeleteUser}
          >
            Eliminar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VerUsuarios;
