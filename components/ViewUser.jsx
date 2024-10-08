
import React from 'react';
import { Box, Text, Button, Modal, VStack } from 'native-base';

const ViewUser = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Información del Usuario</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text bold>Nombre de usuario:</Text>
            <Text>{user.username}</Text>

            <Text bold>Correo electrónico:</Text>
            <Text>{user.email}</Text>

            <Text bold>Rol:</Text>
            <Text>{user.role_id === 1 ? 'Administrador' : 'Vendedor'}</Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewUser;
