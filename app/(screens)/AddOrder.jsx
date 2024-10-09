
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Select, HStack, Button } from 'native-base';
import { getAllProducts } from '../../services/product';
import { useIsFocused } from '@react-navigation/native';
import { getAllclient } from '../../services/client';
import { getAllusers } from '../../services/user';
import { createOrder } from '../../services/order';

export default function AddOrder() {
  const [cliente, setCliente] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [direccion, setDireccion] = useState('');
  const [productoBusqueda, setProductoBusqueda] = useState('');
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [productosPedido, setProductosPedido] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0.00);
  const [prds, setPrds] = useState([]);
  const isFocused = useIsFocused();

  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);


  useEffect(() => {
    if (isFocused) {
      getProducts();
      getUsers();
      getClients();
    }
  }, [isFocused]);


  const getProducts = async () => {
    const response = await getAllProducts();
    if (response.status === 200 || response.status == 200 || response.status === 201) {
      setPrds(response.data);
    }
  }

  const getUsers = async () => {
    const response = await getAllusers();
    if (response.status === 200 || response.status == 200 || response.status === 201) {
      setUsers(response.data);
    }
  }

  const getClients = async () => {
    const response = await getAllclient();
    if (response.status === 200 || response.status == 200 || response.status === 201) {
      console.log(response);
      setClients(response.data);
    }
  }

  const buscarProducto = (query) => {
    const results = prds.filter((producto) =>
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
    setPrecioTotal(precioTotal + productoConCantidad.unit_price * productoConCantidad.quantity);
    setCantidad('');
    setProductoBusqueda('');
    setProductosEncontrados([]);
  };


  const handleCancel = () => {
    setCliente('');
    setVendedor('');
    setDireccion('');
    setProductoBusqueda('');
    setProductosEncontrados([]);
    setProductosPedido([]);
    setCantidad('');
    setMetodoPago('');
    setPrecioTotal(0.00);
  }
  const handleRealizarPedido = async () => {
    const pedido = {
      client_id: cliente,
      total: precioTotal,
      items: productosPedido.map((producto) => ({
        product_id: producto.id,
        quantity: producto.quantity,
        unit_price: producto.unit_price,
        total: producto.unit_price * producto.quantity
      }))
    };
    const response = await createOrder(pedido);
    console.log(response);
    if (response.status === 201 || response.status == 201) {
      alert('Pedido realizado con éxito');
      return;
    }
    alert('Error al realizar el pedido');
  };

  return (
    <ScrollView >
      <View style={styles.container}>


        <Text style={styles.label}>Vendedor</Text>
        <Select onValueChange={(item) => setVendedor(item)} mb={6}>
          {users && users.map((user, index) => (
            <Select.Item key={index} label={user.username} value={user.id} />
          ))}
        </Select>


        <Text style={styles.label}>Cliente</Text>
        <Select onValueChange={(item) => setCliente(item)} mb={5}>
          {clients && clients.map((client, index) => (
            <Select.Item key={index} label={client.name} value={client.id} />
          ))}
        </Select>


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
                <Text>Precio: Q {item.unit_price}</Text>
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
              {producto.name} - {producto.quantity} unidades - Q.{producto.unit_price * producto.quantity}
            </Text>
          ))
        ) : (
          <Text style={styles.noProductos}>No hay productos agregados</Text>
        )}

        <Text style={styles.total}>Precio total</Text>
        <Text style={styles.totalAmount}>Q.{precioTotal.toFixed(2)}</Text>


        <HStack w='100%' style={{ justifyContent: 'center' }} mb={4}>

          <Button onPress={handleRealizarPedido} mr={1} w='80%' colorScheme={'green'}>
            Realizar pedido
          </Button>

          <Button onPress={handleCancel} colorScheme={'red'} >
            Cancelar
          </Button>

        </HStack>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF9E1',
    padding: 20,
    overflow: 'scroll',
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
    maxHeight: 350,
    minHeight: 250,
    height: 'auto',
    padding: 10,
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

