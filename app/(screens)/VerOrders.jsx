// Crete View for react native using  orders service

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Badge } from 'native-base';
import { getOrders } from '../../services/order';
import { useIsFocused } from '@react-navigation/native';

const VerOrders = () => {

  const [orders, setOrders] = useState([]);

  const isFocused = useIsFocused();

  const fetch = async () => {
    const response = await getOrders();
    console.log(response.data);
    console.log(response.data.orders);
    if (response.status == 200 || response.status === 200) {
      setOrders(response.data.orders);
    }
  }

  useEffect(() => {
    if (isFocused) {
      fetch();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box bg={'gray.200'} mt={4} p={4} borderRadius={'12px'}>
            <Box bg={'green.400'} w={'40%'} p={'6px'} borderRadius={12}>
              <Text style={styles.innerOrden}>Orden #{item.id}</Text>
            </Box>
            <Text style={styles.itemText}>{item.client_name}</Text>
            <Text style={styles.price}>Q.{item.total}</Text>
            <Text style={styles.price}>...</Text>
          </Box>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default VerOrders

