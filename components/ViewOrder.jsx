
import React from 'react';
import { Modal, Button, Text, Box, ScrollView, VStack, HStack } from 'native-base';

const ViewOrder = ({ order, isOpen, onClose, orderColor }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontWeight='bold' >
            Orden #{order?.order.id} <Box h='10px' w='10px' borderRadius='full' bg={orderColor}></Box>
          </Text>
        </Modal.Header>
        <Modal.Body border>
          <VStack space={2}>
            <Text>Cliente: {order?.order.client_name}</Text>
            <Text>Fecha de la orden: {new Date(order?.order.order_date).toLocaleDateString()}</Text>
            <Text>Estado: {order?.order.status}</Text>
            <Text>Dirección: {order?.order.address}</Text>
            <Text>Total: Q.{order?.order.total}</Text>
          </VStack>

          <ScrollView mt={4}>
            {order?.items.map((item) => (
              <Box key={item.id} mt={4} p={4} borderRadius={12} borderWidth={1} borderColor="gray.200" >
                <VStack>
                  <Text>Producto: {item.product_name}</Text>
                  <VStack justifyContent="space-between">
                    <Text>Cantidad: {item.quantity}</Text>
                    <Text>Precio Unitario: Q.{item.unit_price}</Text>
                  </VStack>
                  <Text fontWeight={'bold'}>Total: Q.{item.total}</Text>
                </VStack>
              </Box>
            ))}
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button colorScheme={'red'} onPress={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal >
  );
};

export default ViewOrder;

