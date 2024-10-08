
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, Text, FormControl, Input, Stack, Button, useToast, HStack, IconButton, CloseIcon, Spinner, Center } from 'native-base';
import { login } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SessionContext } from '../../context/SessionContext';

export default function LoginScreen() {
  const router = useRouter();
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { saveSession } = useContext(SessionContext);

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

  const handleLogin = async () => {
    console.log('enter here');
    setLoading(true);
    try {
      const response = await login({ username, password });
      if (response.status == 200) {
        const userData = response.data.user;
        const token = response.data.token;
        saveSession(userData, token);
        setUsername('');
        setPassword('');
        showCustomToast('Sesión Iniciada', 'green.500');
        setTimeout(() => {
          router.replace('/Home');
          setLoading(false);
        }, 1000);
      }
      else {
        setUsername('');
        setPassword('');
        showCustomToast('Credenciales Incorrectas', 'red.500');
        setLoading(false);
      }
    }
    catch (error) {
      showCustomToast(error, 'red.500');
      console.log(error);
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="#efffe0" paddingX={4}>
      <Text fontSize="3xl" fontWeight="bold" mb={5}>
        Login
      </Text>

      <FormControl isRequired w="80%" mb={4}>
        <Stack>
          <FormControl.Label>Usuario</FormControl.Label>
          <Input
            placeholder="Usuario"
            value={username}
            onChangeText={text => setUsername(text)}
            isDisabled={loading}
          />
        </Stack>
      </FormControl>

      <FormControl isRequired w="80%" mb={1}>
        <Stack>
          <FormControl.Label>Contraseña</FormControl.Label>
          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={text => setPassword(text)}
            type={showPassword ? 'text' : 'password'}
            isDisabled={loading}
          />
        </Stack>
      </FormControl>

      <Button variant="link" onPress={() => setShowPassword(!showPassword)} alignSelf="flex-end" mr="10%" mb={1} isDisabled={loading}>
        <Text color="green.500">
          {showPassword ? 'Ocultar Contraseña' : 'Ver Contraseña'}
        </Text>
      </Button>

      {loading ? (
        <Center>
          <Spinner size="lg" color="green.500" />
        </Center>
      ) : (
        <>
          <Button w="80%" mb={4} colorScheme="green" onPress={handleLogin}>
            Ingresar
          </Button>

          <Button w="80%" variant="outline" colorScheme="green">
            Olvidé mi contraseña
          </Button>
        </>
      )}
    </Box>
  );
}

