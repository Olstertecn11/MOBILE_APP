
import React, { useState } from 'react';
import { Box, Text, Button, Modal, VStack, Input, useToast } from 'native-base';
import { updateUser } from '../services/user'; // Servicio para actualizar usuario

const ViewUser = ({ isOpen, onClose, user, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [roleId, setRoleId] = useState(user.role_id);
  const toast = useToast();

  const handleUpdateUser = async () => {
    try {
      const updatedData = { username, email, role_id: roleId };
      const response = await updateUser(user.id, updatedData);
      console.log(response);
      if (response.status === 200) {
        onClose();
        toast.show({
          title: 'Usuario actualizado con éxito',
          status: 'success',
        });
        onUpdate();
      } else {
        throw new Error('Error actualizando el usuario');
      }
    } catch (error) {
      onUpdate();
      toast.show({
        title: 'Error al actualizar el usuario',
        status: 'error',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Visualización</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text bold>Nombre de usuario:</Text>
            <Input value={username} onChangeText={setUsername} />

            <Text bold>Correo electrónico:</Text>
            <Input value={email} onChangeText={setEmail} />

            <Text bold>Rol:</Text>
            <Input
              value={roleId === 1 ? 'Administrador' : 'Vendedor'}
              onChangeText={(text) => setRoleId(text === 'Administrador' ? 1 : 2)}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="green.500" onPress={handleUpdateUser}>
            Guardar
          </Button>
          <Button onPress={onClose} ml={2}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewUser;
