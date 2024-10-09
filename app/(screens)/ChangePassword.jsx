
import React, { useContext, useState } from 'react';
import { VStack, Input, Button, Text, Box, useToast, Center } from 'native-base';
import { updateUserPassword } from '../../services/user';
import { SessionContext } from '../../context/SessionContext';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const { user } = useContext(SessionContext);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.show({
        title: "Las contraseñas no coinciden",
        status: "error",
        placement: "top",
        duration: 2000,
      });
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.show({
        title: "Por favor completa todos los campos",
        status: "error",
        placement: "top",
        duration: 2000,
      });
      return;
    }


    const response = await updateUserPassword(user.id, { currentPassword, newPassword });
    console.log(response);
    if (response.status === 200 || response.status == 200) {
      toast.show({
        title: "Contraseña cambiada con éxito",
        status: "success",
        placement: "top",
        duration: 2000,
      });
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Box safeArea p="1" w="100%" py="2">
      <Center >

        <VStack space={4} w='90%'  >
          <Text fontSize="lg" bold>Cambiar Contraseña</Text>

          <Input
            placeholder="Contraseña actual"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            type="password"
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Input
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            type="password"
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Input
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Button onPress={handleChangePassword} colorScheme="green" borderRadius={'12px'} mt={4}>
            Cambiar Contraseña
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default ChangePassword;

