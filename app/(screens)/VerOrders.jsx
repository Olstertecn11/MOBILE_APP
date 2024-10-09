// Crete View for react native using  orders service

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.id}</Text>
            <Text style={styles.itemText}>{item.total}</Text>
          </TouchableOpacity>
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
});

export default VerOrders

