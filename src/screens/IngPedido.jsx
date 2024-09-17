import React, { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from 'native-base';

const IngPedido = () => {
  const [cliente, setCliente] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [direccion, setDireccion] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [precioTotal, setPrecioTotal] = useState(350);

  const handleRealizarPedido = () => {
    console.log({
      cliente,
      vendedor,
      direccion,
      producto,
      cantidad,
      metodoPago,
      precioTotal,
    });
  };

  return (
    <Box flex={1} bg="#ECFFE6" alignItems="center" justifyContent="center">
      <VStack space={4} alignItems="center" w="80%">

        <Input
          variant="filled"
          placeholder="Cliente"
          w="100%"
          bg="#fff"
          value={cliente}
          onChangeText={setCliente}
        />

        {/* Vendedor Input */}
        <Input
          variant="filled"
          placeholder="Vendedor"
          w="100%"
          bg="#fff"
          value={vendedor}
          onChangeText={setVendedor}
        />

        {/* Dirección Input */}
        <Input
          variant="filled"
          placeholder="Dirección"
          w="100%"
          bg="#fff"
          value={direccion}
          onChangeText={setDireccion}
        />

        {/* Producto Input */}
        <Input
          variant="filled"
          placeholder="Producto"
          w="100%"
          bg="#fff"
          value={producto}
          onChangeText={setProducto}
        />

        {/* Cantidad Input */}
        <Input
          variant="filled"
          placeholder="Cantidad"
          w="100%"
          bg="#fff"
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric" // Numeric input for quantity
        />

        {/* Método de Pago Input */}
        <Input
          variant="filled"
          placeholder="Método de pago"
          w="100%"
          bg="#fff"
          value={metodoPago}
          onChangeText={setMetodoPago}
        />

        {/* Precio Total Display */}
        <HStack justifyContent="space-between" w="100%" px={4}>
          <Text bold>Precio total</Text>
          <Text bold>Q.{precioTotal.toFixed(2)}</Text>
        </HStack>

        {/* Realizar Pedido Button */}
        <Button mt="5" colorScheme="green" onPress={handleRealizarPedido}>
          Realizar pedido
        </Button>
      </VStack>
    </Box>
  );
};

export default IngPedido;
