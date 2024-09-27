
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddOrder() {
  const [cliente, setCliente] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [direccion, setDireccion] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [precioTotal, setPrecioTotal] = useState(350.00); // Precio total fijo para el ejemplo

  const handleRealizarPedido = () => {
    // Lógica para procesar el pedido
    console.log('Pedido realizado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
      />

      <Text style={styles.label}>Vendedor</Text>
      <TextInput
        style={styles.input}
        placeholder="Vendedor"
        value={vendedor}
        onChangeText={setVendedor}
      />

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <Text style={styles.label}>Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Producto"
        value={producto}
        onChangeText={setProducto}
      />

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={cantidad}
        keyboardType="numeric"
        onChangeText={setCantidad}
      />

      <Text style={styles.label}>Método de pago</Text>
      <TextInput
        style={styles.input}
        placeholder="Método de pago"
        value={metodoPago}
        onChangeText={setMetodoPago}
      />

      <Text style={styles.total}>Precio total</Text>
      <Text style={styles.totalAmount}>Q.{precioTotal.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={handleRealizarPedido}>
        <Text style={styles.buttonText}>Realizar pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF9E1',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#6C7A89',
  },
  input: {
    height: 40,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FDFDFD',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
