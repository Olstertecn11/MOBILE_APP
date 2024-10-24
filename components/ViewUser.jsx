
import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Modal, VStack, Input, useToast } from 'native-base';
import { updateUser } from '../services/user';

const ViewUser = ({ isOpen, onClose, user, onUpdate, canManage }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    roleId: '',
  });

  const toast = useToast();

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        roleId: user.role_id || '',
      });
    }
  }, [user]);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const updatedData = {
        username: form.username,
        email: form.email,
        role_id: form.roleId
      };
      const response = await updateUser(user.id, updatedData);

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
        <Modal.Header>Modificar Usuario</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text bold>Nombre de usuario:</Text>
            <Input
              value={form.username}
              onChangeText={(value) => handleInputChange('username', value)}
            />

            <Text bold>Correo electrónico:</Text>
            <Input
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />

            <Text bold>Rol:</Text>
            <Input
              value={form.roleId === 1 ? 'Administrador' : 'Vendedor'}
              onChangeText={(value) => handleInputChange('roleId', value === 'Administrador' ? 1 : 2)}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          {canManage && canManage ? (
            <Button bg="green.500" onPress={handleUpdateUser}>
              Guardar
            </Button>
          ) : <Text color='red.600'>No tienes privilegios suficientes para esta acción <Entypo name="emoji-sad" size={18} color="red" /></Text>
          }
          <Button onPress={onClose} ml={2}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewUser;

