
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    { id: '1', nombre: 'Luis Franco', direccion: '1 av 3-7', telefono: '22334567', vendedor: 'José Perez' },
    { id: '2', nombre: 'José Pérez', direccion: '1 av 3-7', telefono: '22334567', vendedor: 'Sin vendedor asignado' },
  ]);

  const [nombre, setNombre] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const handleModificarCliente = () => {
    console.log('Cliente modificado');
  };

  const handleEliminarCliente = () => {
    if (clienteSeleccionado) {
      setClientes(clientes.filter(cliente => cliente.id !== clienteSeleccionado.id));
      setClienteSeleccionado(null);
    }
  };

  const renderCliente = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.direccion}</Text>
      <Text style={styles.cell}>{item.telefono}</Text>
      <Text style={styles.cell}>{item.vendedor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Usuarios</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Nombre</Text>
        <Text style={styles.tableHeaderCell}>Dirección</Text>
        <Text style={styles.tableHeaderCell}>Teléfono</Text>
        <Text style={styles.tableHeaderCell}>Vendedor</Text>
      </View>

      <FlatList
        data={clientes}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id}
        style={styles.table}
      />

      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />

      <TouchableOpacity style={styles.modifyButton} onPress={handleModificarCliente}>
        <Text style={styles.buttonText}>Modificar cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleEliminarCliente}>
        <Text style={styles.buttonText}>Eliminar cliente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFFE0',
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    backgroundColor: '#E0F7D0',
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    width: '90%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '80%',
    marginBottom: 10,
  },
  modifyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Clientes;
