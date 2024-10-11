
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Box, Button, Actionsheet, useDisclose } from 'native-base';
import { updateOrderStatus, getOrders, getOrderItems } from '../../services/order';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ViewOrder from '../../components/ViewOrder';

const VerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // For storing order items
  const isFocused = useIsFocused();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateOrder = async (status, id) => {
    onClose();
    const response = await updateOrderStatus(id, status);
    if (response.status === 200) {
      fetch();
    }
  }

  const fetch = async () => {
    setIsLoading(true);
    const response = await getOrders();
    console.log(response);
    if (response.status === 200) {
      setOrders(response.data.orders);
    }
    setIsLoading(false);
  };

  const getColorStatus = (status) => {
    if (status === 'cancelado') {
      return 'red.500';
    }
    if (status === 'proceso') {
      return 'orange.500';
    }
    if (status === 'finalizado') {
      return 'green.500';
    }
  }

  useEffect(() => {
    if (isFocused) {
      fetch();
    }
  }, [isFocused]);

  const handleOptionsPress = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const viewOrder = async (order_id) => {
    const response = await getOrderItems(order_id);
    if (response.status === 200) {
      setOrderDetails({
        order: selectedOrder,
        items: response.data.items,
      });
      setIsModalOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />

      {!isLoading && orders.length > 0 ? (
        <FlatList
          data={orders}
          style={{ padding: '4px' }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box bg={'gray.200'} mt={4} p={4} borderRadius={12}>
              <Box bg={getColorStatus(item.status)} w={'40%'} p={'6px'} borderRadius={12} mb={2}>
                <Text style={styles.innerOrden}>Orden #{item.id}</Text>
              </Box>
              <Text style={styles.itemText}>Cliente: {item.client_name}</Text>
              <Text style={styles.price}>Total: Q.{item.total}</Text>
              <Button
                position='absolute'
                right={4}
                top={'50%'}
                bg='transparent'
                _pressed={{ bg: 'gray.50' }}
                onPress={() => handleOptionsPress(item)}
              >
                <SimpleLineIcons name="options-vertical" size={20} color="gray" />
              </Button>
            </Box>
          )}
        />
      ) : (
        !isLoading && <Text style={styles.noOrdersText}>No hay órdenes disponibles</Text>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => {
            viewOrder(selectedOrder.id);
            onClose();
          }}>
            Visualizar
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => updateOrder('cancelado', selectedOrder.id)}>Pendiente</Actionsheet.Item>
          <Actionsheet.Item onPress={() => updateOrder('proceso', selectedOrder.id)}>Proceso</Actionsheet.Item>
          <Actionsheet.Item onPress={() => updateOrder('finalizado', selectedOrder.id)}>Finalizado</Actionsheet.Item>
          <Actionsheet.Item onPress={onClose} color="red.500">Cancelar</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {orderDetails && (
        <ViewOrder
          order={orderDetails}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  innerOrden: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default VerOrders;



