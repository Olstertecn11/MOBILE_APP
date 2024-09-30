
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';

const Inventario = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedData, setSortedData] = useState([
    { id: 1, nombre: 'Planta', cantidad: 1, precio: 100.0, imagen: 'Ver', cuidados: 'Ver' },
    { id: 2, nombre: 'Planta', cantidad: 1, precio: 100.0, imagen: 'Ver', cuidados: 'Ver' },
    { id: 3, nombre: 'Planta', cantidad: 1, precio: 100.0, imagen: 'Ver', cuidados: 'Ver' },
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
    setSortedData(sorted);
    setSortOrder(newSortOrder);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.cantidad}</Text>
      <Text style={styles.cell}>{item.precio.toFixed(2)}</Text>
      <TouchableOpacity>
        <Text style={styles.link}>Ver</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={styles.modifyText}>...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.label}>Ordenar</Text>
        <TouchableOpacity onPress={handleSort}>
          <Text style={styles.sortButton}>
            {sortOrder === 'asc' ? '🔼 Orden alfabético' : '🔽 Orden alfabético'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerCell}>Nombre</Text>
            <Text style={styles.headerCell}>Cantidad</Text>
            <Text style={styles.headerCell}>Precio</Text>
            <Text style={styles.headerCell}>Imagen</Text>
            <Text style={styles.headerCell}>Cuidados</Text>
            <Text style={styles.headerCell}>Acciones</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFFFE0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  sortButton: {
    marginRight: 20,
    fontSize: 16,
    color: 'green',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#d3f9d8',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  link: {
    flex: 1,
    color: '#4CAF50',
    textAlign: 'center',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modifyText: {
    color: 'green',
  },
  deleteText: {
    color: 'red',
  },
});

export default Inventario;

