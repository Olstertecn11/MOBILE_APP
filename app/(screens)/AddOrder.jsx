
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView, VStack, useToast, Box, Select, Text, HStack, Button, IconButton, CloseIcon } from 'native-base';
import { getAllProducts } from '../../services/product';
import { useIsFocused } from '@react-navigation/native';
import { getAllclient } from '../../services/client';
import { getAllusers } from '../../services/user';
import { createOrder } from '../../services/order';
import Loader from '../../components/Loader';
import AntDesign from '@expo/vector-icons/AntDesign';


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
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);


  const showCustomToast = (message, bgColor) => {
    toast.show({
      placement: "top-right",
      duration: 3000,
      render: () => (
        <Box bg={bgColor} px="4" py="2" rounded="md" mb={5}>
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <Text color="white" fontWeight="bold">{message}</Text>
            <IconButton icon={<CloseIcon size="xs" color="white" />} onPress={() => toast.closeAll()} />
          </HStack>
        </Box>
      ),
    });
  };
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
      console.log(response.data);
      setProductosEncontrados(response.data);
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
      setClients(response.data);
    }
  }

  const buscarProducto = (query) => {
    const results = prds.filter((producto) =>
      producto.name.toLowerCase().includes(query.toLowerCase()) &&
      !productosPedido.some(pedido => pedido.id === producto.id)
    );
    setProductosEncontrados(results);
  };

  const actualizarCantidadProducto = (productoId, incremento) => {
    let nuevoPrecioTotal = precioTotal;

    const nuevosProductosPedido = productosPedido
      .map((producto) => {
        if (producto.id === productoId) {
          const nuevaCantidad = producto.quantity + incremento;

          if (nuevaCantidad < 1) {
            nuevoPrecioTotal -= producto.unit_price * producto.quantity;
            return null;
          }

          const productoOriginal = prds.find(p => p.id === productoId);
          if (nuevaCantidad > productoOriginal.quantity) {
            showCustomToast(`No hay suficientes existencias. Disponible: ${productoOriginal.quantity}`, 'red.500');
            return producto;
          }

          nuevoPrecioTotal += producto.unit_price * incremento;
          return { ...producto, quantity: nuevaCantidad };
        }
        return producto;
      })
      .filter(producto => producto !== null);

    setProductosPedido(nuevosProductosPedido);
    setPrecioTotal(nuevoPrecioTotal);

    const productosFiltrados = prds.filter(p => !nuevosProductosPedido.some(pedido => pedido.id === p.id));
    setProductosEncontrados(productosFiltrados);
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
    const productosFiltrados = prds.filter(p => ![...productosPedido, productoConCantidad].some(pedido => pedido.id === p.id));
    setProductosEncontrados(productosFiltrados);
  };


  const handleCancel = () => {
    setCliente('');
    setVendedor('');
    setDireccion('');
    setProductoBusqueda('');
    setProductosEncontrados(prds);
    setProductosPedido([]);
    setCantidad('');
    setMetodoPago('');
    setPrecioTotal(0.00);
  }


  const handleRealizarPedido = async () => {
    if (!cliente || !vendedor || !direccion || productosPedido.length === 0 || !metodoPago) {
      showCustomToast('Por favor completa todos los campos', 'red.500');
      return;
    }

    setLoading(true);

    const pedido = {
      client_id: cliente,
      total: precioTotal,
      items: productosPedido.map((producto) => ({
        product_id: producto.id,
        quantity: producto.quantity,
        unit_price: producto.unit_price,
        total: producto.unit_price * producto.quantity
      })),
      direction: direccion
    };

    const response = await createOrder(pedido);
    console.log(response);

    if (response.status === 201 || response.status == 201) {
      showCustomToast('Pedido realizado con éxito', 'green.500');
      setLoading(false);
      setTimeout(() => {
        handleCancel();
      }, 1000);
      return;
    }

    showCustomToast('Error al realizar el pedido', 'red.500');
    setLoading(false);

    setTimeout(() => {
      handleCancel();
    }, 1000);
  };

  return (
    <ScrollView >

      <View style={styles.container}>

        <Loader loading={loading} />
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


        <Text>Productos: {productosEncontrados && (productosEncontrados.length)}</Text>
        <ScrollView style={styles.scrollView} nestedScrollEnabled={true} p={4}>
          <VStack>
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
          </VStack>
        </ScrollView>

        <Text style={styles.label}>Método de pago</Text>
        <TextInput
          style={styles.input}
          placeholder="Método de pago"
          value={metodoPago}
          onChangeText={setMetodoPago}
        />

        <Text style={styles.total}>Productos Agregados</Text>

        <ScrollView nestedScrollEnabled={true} h={80} pb={2}>
          {productosPedido.length > 0 ? (
            productosPedido.map((producto, index) => (
              <Box key={index} bg='muted.50' p={4} borderRadius={'12px'} mt={2} >
                <Text style={styles.productoAgregado}>
                  {producto.name} -  unidades({producto.quantity}) - Q.{producto.unit_price * producto.quantity}
                </Text>
                <HStack space={2}>
                  <Button _pressed={{ bg: 'gray.50' }} bg='transparent' onPress={() => actualizarCantidadProducto(producto.id, 1)}>
                    <AntDesign name="pluscircle" size={24} color="green" />
                  </Button>
                  <Button _pressed={{ bg: 'gray.50' }} bg='transparent' onPress={() => actualizarCantidadProducto(producto.id, -1)}>
                    <AntDesign name="minuscircle" size={24} color="red" />
                  </Button>
                </HStack>
              </Box>
            ))
          ) : (
            <Text style={styles.noProductos}>No hay productos agregados</Text>
          )}
        </ScrollView>

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
    maxHeight: 250,
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

