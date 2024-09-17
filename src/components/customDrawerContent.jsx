
import React from 'react';
import { Box, Text, VStack, Pressable, HStack, Avatar, Button } from 'native-base';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import myicon from '../assets/profile.png'

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Box bg="green.100" p={4} mb={2}>
        <HStack space={3} alignItems="center">
          <Avatar
            size="lg"
            source={myicon}
          />
          <VStack>
            <Text bold fontSize="lg">Luis Franco</Text>
            <Text>@lfranco</Text>
          </VStack>
        </HStack>
      </Box>

      <VStack space={4} px={4}>
        <Pressable
          onPress={() => props.navigation.navigate('Home')}
          bg="green.200"
          p={3}
          rounded="md"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="home" size={20} color="green" style={{ marginRight: 10 }} />
          <Text color="green.800" fontSize="md">Home</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('IngInventario')}
          bg="green.200"
          p={3}
          rounded="md"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="cube" size={20} color="green" style={{ marginRight: 10 }} />
          <Text color="green.800" fontSize="md">Ingresar Inventario</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('IngUsuario')}
          bg="green.200"
          p={3}
          rounded="md"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="person" size={20} color="green" style={{ marginRight: 10 }} />
          <Text color="green.800" fontSize="md">Ingresar Usuario</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('IngCliente')}
          bg="green.200"
          p={3}
          rounded="md"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="people" size={20} color="green" style={{ marginRight: 10 }} />
          <Text color="green.800" fontSize="md">Ingresar Cliente</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('VerCliente')}
          bg="green.200"
          p={3}
          rounded="md"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="eye" size={20} color="green" style={{ marginRight: 10 }} />
          <Text color="green.800" fontSize="md">Ver Clientes</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('IngPedido')}
          bg="green.200"
          p={3}
          rounded="md"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="cart" size={20} color="green" style={{ marginRight: 10 }} />
          <Text color="green.800" fontSize="md">Ingresar Pedido</Text>
        </Pressable>
      </VStack>

      <Box p={4} mt={4}>
        <Button
          colorScheme="green"
          onPress={() => alert('Logging Off')}
          leftIcon={<Icon name="log-out" size={20} color="white" />}
        >
          Log Off
        </Button>
      </Box>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

