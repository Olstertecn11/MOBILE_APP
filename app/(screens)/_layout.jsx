
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { Avatar, VStack, Box, Text, FormControl, Input, Stack, Button, useToast, HStack, IconButton, CloseIcon, Spinner, Center } from 'native-base';
import { SessionContext } from '../../context/SessionContext';
import { useState, useEffect, useContext } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { logout } from '../../services/auth';

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Layout() {
  const navigation = useNavigation();
  const toast = useToast();
  const { clearSession, token } = useContext(SessionContext);




  const showCustomToast = (message, bgColor) => {
    toast.show({
      placement: "top-right",
      duration: 3000,
      render: () => (
        <Box bg={bgColor} px="4" py="2" rounded="md" mb={5}>
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <Text color="white" fontWeight="bold">{message}</Text>
            <IconButton icon={<CloseIcon size="xs" color="white" />} onPress={() => toast.closeAll()} />
          </HStack>
        </Box>
      ),
    });
  };


  const handleLogout = async () => {
    const response = await logout(token);
    console.log(response);
    if (response.status == 200 || response.status === 200) {
      clearSession();
      navigation.replace('index');
      showCustomToast('Se ha cerrado Sesión', 'red.500');
      return;
    }
    showCustomToast('Error al cerrar sesión', 'red.500');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} onLogout={handleLogout} />}>
        <Drawer.Screen
          name="Home"
          options={{ title: 'Inicio' }}
        />
        <Drawer.Screen
          name="AddUser"
          options={{ title: 'Agregar Usuario' }}
        />
        <Drawer.Screen
          name="AddClient"
          options={{ title: 'Agregar Cliente' }}
        />
        <Drawer.Screen
          name="AddProduct"
          options={{ title: 'Agregar Producto' }}
        />
        <Drawer.Screen
          name="AddOrder"
          options={{ title: 'Agregar Pedido' }}
        />
        <Drawer.Screen
          name="VerClientes"
          options={{ title: 'Clientes' }}
        />
        <Drawer.Screen
          name="VerUsuarios"
          options={{ title: 'Usuarios' }}
        />

        <Drawer.Screen
          name="Config"
          options={{ title: 'Configuración' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props) {

  const { user } = useContext(SessionContext);
  console.log(user)
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <Box p={4} bg="green.200">
        <HStack space={3} alignItems="center">
          <Avatar
            size="lg"
            source={{
              uri: user?.imageUri ?? 'https://via.placeholder.com/150'
            }}
          />
          <VStack>
            <Text bold fontSize="md">{user?.username ?? 'Username'}</Text>
            <Text color="gray.500" fontSize="sm">{user?.email ?? 'user@gmail.com'}</Text>
            <Text color="green.800" onPress={() => navigation.navigate('Config')} fontSize="sm">Mi Perfil</Text>
          </VStack>
        </HStack>
      </Box>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar Sesión"
        onPress={props.onLogout}
        labelStyle={{ color: 'red', fontSize: 16 }}
      />


    </DrawerContentScrollView>
  );
}

