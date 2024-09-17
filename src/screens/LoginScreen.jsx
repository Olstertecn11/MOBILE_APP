import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, FormControl, Input, Stack, Button, Link, useToast, HStack, Text, IconButton, CloseIcon } from 'native-base';

const LoginScreen = () => {
  const navigation = useNavigation();
  const initialUserState = { username: '', password: '' };
  const [user, setUser] = useState(initialUserState);
  const toast = useToast(); // Hook para manejar los toasts

  const showCustomToast = (message, bgColor) => {
    toast.show({
      placement: "top-right", // Colocar en la esquina superior derecha
      duration: 3000, // Duración del toast
      render: () => {
        return (
          <Box bg={bgColor} px="4" py="2" rounded="md" mb={5}>
            <HStack space={2} justifyContent="space-between" alignItems="center">
              <Text color="white" fontWeight="bold">
                {message}
              </Text>
              <IconButton icon={<CloseIcon size="xs" color="white" />} onPress={() => toast.closeAll()} />
            </HStack>
          </Box>
        );
      },
    });
  };

  const handleLogin = () => {
    if (user.username === 'admin' && user.password === 'admin') {
      showCustomToast('Inicio de sesión exitoso', 'green.500');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    } else {
      showCustomToast('Usuario o contraseña incorrectos', 'red.500');
    }
  };

  return (
    <Box w="100%" paddingTop={32} bgColor={'green.100'} h={'100%'}>
      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Usuario</FormControl.Label>
          <Input 
            value={user.username}
            onChangeText={(value) => setUser((prev) => ({ ...prev, username: value }))}
            _light={{
              bg: "coolGray.100",
              _hover: { bg: "coolGray.200" },
              _focus: { bg: "coolGray.200:alpha.70" }
            }}
            _dark={{
              bg: "coolGray.800",
              _hover: { bg: "coolGray.900" },
              _focus: { bg: "coolGray.900:alpha.70" }
            }}
            shadow={2}
            type="text"
            placeholder="Luis123"
          />
        </Stack>
      </FormControl>

      <FormControl isRequired marginTop={4}>
        <Stack mx="4">
          <FormControl.Label>Contraseña</FormControl.Label>
          <Input
            value={user.password}
            onChangeText={(value) => setUser((prev) => ({ ...prev, password: value }))}
            _light={{
              bg: "coolGray.100",
              _hover: { bg: "coolGray.200" },
              _focus: { bg: "coolGray.200:alpha.70" }
            }}
            _dark={{
              bg: "coolGray.800",
              _hover: { bg: "coolGray.900" },
              _focus: { bg: "coolGray.900:alpha.70" }
            }}
            shadow={2}
            type="password"
            placeholder="********"
          />
          <Link alignSelf="flex-end" colorScheme="green" mt={2}>
            Recuperar contraseña
          </Link>
        </Stack>
      </FormControl>

      <Button 
        bg={'#389618'} 
        marginLeft={4} 
        marginRight={4} 
        marginTop={6} 
        onPress={handleLogin}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default LoginScreen;
