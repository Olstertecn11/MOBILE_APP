import React from 'react';
import { Modal, Button, VStack, Image, Text } from 'native-base';

const ViewProduct = ({ isOpen, onClose, product }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{product?.name}</Modal.Header>
        <Modal.Body>
          <VStack space={4} alignItems="center">
            <Image
              source={{ uri: `data:image/jpeg;base64,${product?.image}` || 'https://via.placeholder.com/150' }}
              alt="Imagen del producto"
              size="2xl"
              borderRadius={10}
            />
            <Text bold>Precio:</Text>
            <Text>Q {product?.unit_price}</Text>
            <Text bold>Cantidad:</Text>
            <Text>{product?.quantity}</Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewProduct;
