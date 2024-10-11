
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Box, Button, Actionsheet, useDisclose } from 'native-base';
import { getOrders } from '../../services/order';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const VerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isFocused = useIsFocused();
  const { isOpen, onOpen, onClose } = useDisclose();

  const fetch = async () => {
    setIsLoading(true);
    const response = await getOrders();
    if (response.status === 200) {
      setOrders(response.data.orders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetch();
    }
  }, [isFocused]);

  const handleOptionsPress = (order) => {
    setSelectedOrder(order);
    onOpen();
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
              <Box bg={'green.400'} w={'40%'} p={'6px'} borderRadius={12} mb={2}>
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
                onPress={() => handleOptionsPress(item)} // Trigger ActionSheet on press
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
          <Actionsheet.Item onPress={() => console.log('Visualizar:', selectedOrder)}>Visualizar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => console.log('Pendiente:', selectedOrder)}>Pendiente</Actionsheet.Item>
          <Actionsheet.Item onPress={() => console.log('Proceso:', selectedOrder)}>Proceso</Actionsheet.Item>
          <Actionsheet.Item onPress={() => console.log('Finalizado:', selectedOrder)}>Finalizado</Actionsheet.Item>
          <Actionsheet.Item onPress={onClose} color="red.500">Cancelar</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
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

