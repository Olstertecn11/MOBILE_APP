
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LoginScreen from './Login';

export default function Layout() {
  const router = useRouter();
  const isLogged = false;

  const handleLogout = () => {
    router.replace('/Login');
  };

  if (!isLogged) {
    return <LoginScreen />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent {...props} handleLogout={handleLogout} />
        )}
      >
        <Drawer.Screen
          name="AddClient"
          options={{
            drawerLabel: 'Agregar Cliente',
            title: 'Agregar Cliente',
          }}
        />
        <Drawer.Screen
          name="Clientes"
          options={{
            drawerLabel: 'Lista de Clientes',
            title: 'Clientes',
          }}
        />
        <Drawer.Screen
          name="AddProduct"
          options={{
            drawerLabel: 'Agregar Producto',
            title: 'Agregar Producto',
          }}
        />
        <Drawer.Screen
          name="AddUser"
          options={{
            drawerLabel: 'Agregar Usuario',
            title: 'Agregar Usuario',
          }}
        />
        <Drawer.Screen
          name="Inventario"
          options={{
            drawerLabel: 'Ver Inventario',
            title: 'Inventario',
          }}
        />
        <Drawer.Screen
          name="AddOrder"
          options={{
            drawerLabel: 'Agregar Orden',
            title: 'Agregar Orden',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

// Componente personalizado para el contenido del Drawer
function CustomDrawerContent({ handleLogout, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Aquí irán las opciones del Drawer usando navegación manual */}
      <TouchableOpacity onPress={() => navigation.navigate('AddClient')}>
        <View style={{ padding: 20 }}>
          <Text>Agregar Cliente</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Clientes')}>
        <View style={{ padding: 20 }}>
          <Text>Lista de Clientes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
        <View style={{ padding: 20 }}>
          <Text>Agregar Producto</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
        <View style={{ padding: 20 }}>
          <Text>Agregar Usuario</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Inventario')}>
        <View style={{ padding: 20 }}>
          <Text>Ver Inventario</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View style={{ padding: 10, margin: 20, borderRadius: 8, backgroundColor: 'red' }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

