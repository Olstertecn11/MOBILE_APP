
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { Avatar, VStack, Box, Text, FormControl, Input, Stack, Button, useToast, HStack, IconButton, CloseIcon, Spinner, Center } from 'native-base';
import { SessionContext } from '../../context/SessionContext';
import { useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Layout() {
  const navigation = useNavigation();
  const toast = useToast();
  const { clearSession } = useContext(SessionContext);




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
    // await AsyncStorage.removeItem('user');
    // await AsyncStorage.removeItem('token');
    clearSession();
    navigation.replace('index');
    showCustomToast('Se ha cerrado Sesión', 'red.500');
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
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props) {

  const { user } = useContext(SessionContext);
  return (
    <DrawerContentScrollView {...props}>
      <Box p={4} bg="green.200">
        <HStack space={3} alignItems="center">
          <Avatar
            size="lg"
            source={{
              uri: 'https://via.placeholder.com/150'
            }}
          />
          <VStack>
            <Text bold fontSize="md">{user?.username ?? 'Username'}</Text>
            <Text color="gray.500" fontSize="sm">{user?.email ?? 'user@gmail.com'}</Text>
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

