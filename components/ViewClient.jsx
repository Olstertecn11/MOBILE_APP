
import React from 'react';
import { useToast, Box, Input, Text, Button, Modal, VStack } from 'native-base';
import { updateClient } from '../services/client';

const ViewClient = ({ isOpen, onClose, client, update }) => {
  const [currentClient, setCurrentClient] = React.useState(client);
  const toast = useToast();
  const [fields, setFields] = React.useState({ name: false, address: false, phone: false, assigned_seller: false });

  const handleChange = (key, value) => {
    setCurrentClient((prev) => ({ ...prev, [key]: value }));
  };

  const switchField = (key) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const updateUserData = async () => {
    const response = await updateClient(client.id, currentClient);
    console.log(response);
    if (response.status === 200 || response.status == 200) {
      toast.show({
        title: 'Cliente actualizado',
        status: 'success',
      });
    }
    else {
      toast.show({
        title: 'Error al actualizar el cliente',
        status: 'error',
      });
    }
    update()
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Información del Cliente</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text bold>Nombre:</Text>
            {fields['name'] ? (
              <Input
                value={currentClient.name}
                onChangeText={(value) => handleChange('name', value)}
                onBlur={() => switchField('name')}
                autoFocus
                borderWidth={1}
              />
            ) : (
              <Text onPress={() => switchField('name')}>{currentClient.name || 'Haga clic para editar'}</Text>
            )}

            <Text bold>Dirección:</Text>
            {fields['address'] ? (
              <Input
                value={currentClient.address}
                onChangeText={(value) => handleChange('address', value)}
                onBlur={() => switchField('address')}
                autoFocus
                borderWidth={1}
              />
            ) : (
              <Text onPress={() => switchField('address')}>{currentClient.address || 'Haga clic para editar'}</Text>
            )}

            <Text bold>Teléfono:</Text>
            {fields['phone'] ? (
              <Input
                value={currentClient.phone}
                onChangeText={(value) => handleChange('phone', value)}
                onBlur={() => switchField('phone')}
                autoFocus
                borderWidth={1}
              />
            ) : (
              <Text onPress={() => switchField('phone')}>{currentClient.phone || 'Haga clic para editar'}</Text>
            )}

            <Text bold>Vendedor Asignado:</Text>
            {fields['assigned_seller'] ? (
              <Input
                value={currentClient.assigned_seller}
                onChangeText={(value) => handleChange('assigned_seller', value)}
                onBlur={() => switchField('assigned_seller')}
                autoFocus
                borderWidth={1}
              />
            ) : (
              <Text onPress={() => switchField('assigned_seller')}>
                {currentClient.assigned_seller || 'Sin vendedor asignado'}
              </Text>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button mr={2} bg={'yellow.600'} onPress={updateUserData}>Actualizar</Button>
          <Button onPress={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewClient;

