
import React from 'react';
import { Box, Text, Button, Modal, VStack } from 'native-base';

const ViewClient = ({ isOpen, onClose, client }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Información del Cliente</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text bold>Nombre:</Text>
            <Text>{client.name}</Text>

            <Text bold>Dirección:</Text>
            <Text>{client.address}</Text>

            <Text bold>Teléfono:</Text>
            <Text>{client.phone}</Text>

            <Text bold>Vendedor Asignado:</Text>
            <Text>{client.assigned_seller || 'Sin vendedor asignado'}</Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewClient;
