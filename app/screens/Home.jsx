
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
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

