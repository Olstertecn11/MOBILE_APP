
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { Actionsheet, useDisclose, Button } from 'native-base';
import { getAllProducts, deleteProduct } from '../../services/product';
import ViewProduct from '../../components/ViewProduct';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';

const Inventario = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [allProducts, setAllProducts] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclose();
  const isFocused = useIsFocused();
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      setAllProducts(response.data);
      setSortedData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Error fetching products');
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused)
      fetchProducts();
  }, [isFocused]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = allProducts.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSortedData(filteredData);
    } else {
      setSortedData(allProducts);
    }
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedData(sorted);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response.status === 200) {
        Alert.alert('Producto eliminado con éxito');
        const updatedProducts = sortedData.filter(product => product.id !== id);  // Filtramos el producto eliminado
        setSortedData(updatedProducts);  // Actualizamos la lista
        setAllProducts(updatedProducts); // También actualizamos la copia
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar producto');
    }
  };

  const openActionsheet = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>Q {item.unit_price}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openActionsheet(item)}>
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
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {loading && <Loader isLoading={loading} />}

      {sortedData.length > 0 && !loading ? (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerCell}>Nombre</Text>
              <Text style={styles.headerCell}>Cantidad</Text>
              <Text style={styles.headerCell}>Precio</Text>
              <Text style={styles.headerCell}>Acciones</Text>
            </View>
          )}
        />
      ) : (
        ''
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => { setIsViewProductOpen(true); onClose(); }}>Visualizar</Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleDelete(selectedItem.id)} color="red.500">Eliminar</Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>Cancelar</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {selectedItem && (
        <ViewProduct
          isOpen={isViewProductOpen}
          onClose={() => setIsViewProductOpen(false)}
          product={selectedItem}
          refreshInventory={() => fetchProducts()}
        />
      )}
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
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modifyText: {
    color: 'green',
  },
});

export default Inventario;

