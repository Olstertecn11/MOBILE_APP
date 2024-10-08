import React, { useState, useContext } from 'react';
import { Select, Box, Input, VStack, Button, Avatar, HStack, Text, IconButton, ScrollView, Center, useToast } from 'native-base';
import { SessionContext } from '../../context/SessionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Config = () => {
  const { user, clearSession } = useContext(SessionContext); // Obtener datos del contexto de sesión
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [roleId, setRoleId] = useState(user?.role_id.toString() || '');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const toast = useToast();

  const handleUpdate = () => {
    toast.show({
      title: "Perfil actualizado",
      status: "success",
      placement: "top",
      duration: 2000,
    });
  };

  return (
    <ScrollView>
      <Center mt={10}>
        <VStack space={4} width="90%">
          <Center>
            <HStack>
              <Avatar size="xl" source={{ uri: user?.image ?? 'https://via.placeholder.com/150' }} />
              <FontAwesome name="exchange" size={24} color="gray" />
            </HStack>
            <Text mt={2} bold fontSize="lg">{username || 'Username'}</Text>
            <Text fontSize="sm" color="gray.500">{email || 'user@gmail.com'}</Text>
          </Center>

          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Select
            selectedValue={roleId}
            minWidth="200"
            accessibilityLabel="Seleccionar Rol"
            placeholder="Seleccionar Rol"
            onValueChange={setRoleId}
            mt={1}
            size="lg"
            variant="filled"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          >
            <Select.Item label="Administrador" value="1" />
            <Select.Item label="Vendedor" value="2" />
          </Select>
          <Text textAlign={'right'} color={'success.700'} onPress={() => navigation.navigate('ChangePassword')}>Cambiar Contraseña</Text>


          <Button onPress={handleUpdate} colorScheme="green" mt={4}>
            Actualizar Perfil
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default Config;
