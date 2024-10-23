

import React, { useState } from 'react';
import { VStack, FormControl, Input, Button, Select, CheckIcon, Center, Box, Text, useToast } from 'native-base';
import { createUser } from '../../services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const AddUser = () => {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const isFocused = useIsFocused();
  const [canAdd, setCanAdd] = React.useState(true);

  const checkRoles = async () => {
    const user = await AsyncStorage.getItem('user');
    const _user = JSON.parse(user);
    console.log(_user.role_id)
    if (_user.role_id > 1) {
      setCanAdd(false);
      return;
    }
  }


  React.useEffect(() => {
    if (isFocused) {
      checkRoles();
    }
  }, [isFocused]);

  const handleAgregarUsuario = async () => {
    if (!nombre || !rol) {
      toast.show({
        description: "Todos los campos son obligatorios",
        bgColor: "red.500",
      });
      return;
    }

    setLoading(true);

    try {
      const userData = {
        username: nombre,
        password: 'measombrasgt',
        role_id: rol === 'admin' ? 1 : 2,
        email: `${nombre.toLowerCase().replace(' ', '.')}@example.com`,
      };

      const response = await createUser(userData);
      if (response.status === 201) {
        toast.show({
          description: "Usuario creado exitosamente",
          bgColor: "green.500",
        });
        setNombre('');
        setRol('');
      } else {
        toast.show({
          description: "Error al crear usuario",
          bgColor: "red.500",
        });
      }
    } catch (error) {
      toast.show({
        description: "Error al crear usuario",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center h={'100%'} px="2" bg="#ECFFE6">
      <Box paddingTop={20} height={'100%'} width="90%" maxW="290">
        <Text fontSize="xl" fontWeight="medium" color="coolGray.800" marginBottom="4">
          Ingreso de usuario
        </Text>

        <VStack space={3} mt="2">
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Rol</FormControl.Label>
            <Select
              selectedValue={rol}
              minWidth="200"
              accessibilityLabel="Seleccione un rol"
              placeholder="Seleccione un rol"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={setRol}
            >
              <Select.Item label="Administrador" value="admin" />
              <Select.Item label="Vendedor" value="vendedor" />
            </Select>
          </FormControl>
          {canAdd &&
            <Button
              mt="2"
              colorScheme="green"
              isLoading={loading}
              onPress={handleAgregarUsuario}
            >
              Agregar usuario
            </Button>
          }
        </VStack>
      </Box>
    </Center>
  );
};

export default AddUser;

