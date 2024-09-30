
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { Helmet } from 'react-helmet';

export default function Layout() {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('Cerrar sesión');
    navigation.replace('index');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Helmet>
        <title>ME ASOMBRAS.GT</title>
      </Helmet>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} onLogout={handleLogout} />}>
        <Drawer.Screen
          name="Home"
          options={{ title: 'Inicio' }}
        />
        <Drawer.Screen
          name="AddUser"
          options={{ title: 'Agregar Usuario' }}
        />
        <Drawer.Screen
          name="AddOrder"
          options={{ title: 'Agregar Pedido' }}
        />
        <Drawer.Screen
          name="Clientes"
          options={{ title: 'Clientes' }}
        />
        <Drawer.Screen
          name="AddClient"
          options={{ title: 'Agregar Cliente' }}
        />
        <Drawer.Screen
          name="AddProduct"
          options={{ title: 'Agregar Producto' }}
        />
        <Drawer.Screen
          name="Inventario"
          options={{ title: 'Inventario' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar Sesión"
        onPress={props.onLogout}
        labelStyle={{ color: 'red', fontSize: 16 }}
      />
    </DrawerContentScrollView>
  );
}

