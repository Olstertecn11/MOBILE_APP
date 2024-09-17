import React, { useState } from 'react';
import { VStack, FormControl, Input, Button, Select, CheckIcon, Center, Box, Text } from 'native-base';

const IngUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');

  return (
    <Center h={'100%'} px="2" bg="#ECFFE6">
      <Box paddingTop={20} height={'100%'} width="90%" maxW="290">
        <Text fontSize="xl" fontWeight="medium" color="coolGray.800" marginBottom="4">
          Ingreso de usuario
        </Text>

        <VStack space={3} mt="2">
          <FormControl>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Rol</FormControl.Label>
            <Select
              selectedValue={rol}
              minWidth="200"
              accessibilityLabel="Seleccione un rol"
              placeholder="Seleccione un rol"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={setRol}
            >
              <Select.Item label="Administrador" value="admin" />
              <Select.Item label="Vendedor" value="vendedor" />
            </Select>
          </FormControl>

          <Button mt="2" colorScheme="green" onPress={() => console.log(nombre, rol)}>
            Agregar usuario
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default IngUsuario;
