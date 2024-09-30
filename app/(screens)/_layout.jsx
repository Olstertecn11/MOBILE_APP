
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';

export default function Layout() {
  const navigation = useNavigation();
  console.log("Rutas disponibles: ", navigation.getState().routes);


  const handleLogout = () => {
    console.log('Cerrar sesión');
    navigation.replace('index');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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

