
import React from 'react';
import { View, Text, Center, Button, HStack, useToast } from "native-base";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as MailComposer from 'expo-mail-composer';
import BackButton from '../../components/BackButton';

const PasswordRecovery = () => {
  const toast = useToast();

  const handleContact = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      MailComposer.composeAsync({
        recipients: ['lafm2002@gmail.com'],
        subject: 'Recuperación de contraseña',
        body: 'Por favor, necesito recuperar mi contraseña.',
      })
        .then(result => {
          if (result.status === 'sent') {
            toast.show({
              title: "Correo enviado exitosamente",
              status: "success",
              placement: "top",
            });
          }
        })
        .catch(() => {
          toast.show({
            title: "Error al enviar el correo",
            status: "error",
            placement: "top",
          });
        });
    } else {
      toast.show({
        title: "El servicio de correo no está disponible en este dispositivo",
        status: "error",
        placement: "top",
      });
    }
  };

  return (
    <View mt={4} h={'100%'} w='100%'>
      <BackButton route='/' />
      <Center p={'10%'} mt={20}>
        <Text fontWeight='bold' fontSize='35px' color='green.600' textAlign='center'>
          Recuperar Contraseña <Entypo name="key" size={24} color="green" />
        </Text>
        <Text fontSize='15px' color='green.500' textAlign='center' mt={10}>
          Contacta con el administrador del sistema para poder reestablecer tu contraseña
        </Text>
        <Button bg='green.600' w='100%' mt={25} onPress={handleContact}>
          <HStack space={2} alignItems="center" justifyContent="center">
            <Text color="white" fontSize="md">
              Contactar
            </Text>
            <FontAwesome name="send" size={20} color="white" />
          </HStack>
        </Button>
      </Center>
    </View>
  )
}

export default PasswordRecovery;

