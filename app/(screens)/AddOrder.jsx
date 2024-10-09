
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddOrder() {
  const [cliente, setCliente] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [direccion, setDireccion] = useState('');
  const [productoBusqueda, setProductoBusqueda] = useState('');
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [productosPedido, setProductosPedido] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0.00); // Precio total dinámico

  const productosMock = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
    { id: 3, name: 'Producto 3', price: 150 },
  ];

  const buscarProducto = (query) => {
    const results = productosMock.filter((producto) =>
      producto.name.toLowerCase().includes(query.toLowerCase())
    );
    setProductosEncontrados(results);
  };

  const agregarProducto = (producto) => {
    const productoConCantidad = {
      ...producto,
      quantity: cantidad ? parseInt(cantidad) : 1,
    };

    setProductosPedido([...productosPedido, productoConCantidad]);
    setPrecioTotal(precioTotal + productoConCantidad.price * productoConCantidad.quantity);
    setCantidad('');
    setProductoBusqueda('');
    setProductosEncontrados([]);
  };

  const handleRealizarPedido = () => {
    const pedido = {
      cliente,
      vendedor,
      direccion,
      productos: productosPedido,
      metodoPago,
      precioTotal,
    };
    console.log('Pedido realizado:', pedido);
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

      <Text style={styles.label}>Buscar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar producto"
        value={productoBusqueda}
        onChangeText={(query) => {
          setProductoBusqueda(query);
          buscarProducto(query);
        }}
      />

      <ScrollView style={styles.scrollView}>
        {productosEncontrados.length > 0 ? (
          productosEncontrados.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.productoEncontrado}
              onPress={() => agregarProducto(item)}
            >
              <Text>{item.name}</Text>
              <Text>Precio: Q {item.price}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noProductos}>No se encontraron productos</Text>
        )}
      </ScrollView>

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

      <Text style={styles.total}>Productos Agregados</Text>
      {productosPedido.length > 0 ? (
        productosPedido.map((producto, index) => (
          <Text key={index} style={styles.productoAgregado}>
            {producto.name} - {producto.quantity} unidades - Q.{producto.price * producto.quantity}
          </Text>
        ))
      ) : (
        <Text style={styles.noProductos}>No hay productos agregados</Text>
      )}

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
  scrollView: {
    maxHeight: 150,
    marginBottom: 15,
    backgroundColor: '#FDFDFD',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5,
  },
  productoEncontrado: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    marginBottom: 10,
    borderRadius: 5,
  },
  noProductos: {
    fontSize: 16,
    color: '#FF6B6B',
    marginBottom: 20,
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

