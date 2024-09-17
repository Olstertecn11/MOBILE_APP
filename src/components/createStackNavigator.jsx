
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawerContent from './customDrawerContent';
import IngInventario from './IngInventario';
import IngUsuario from '../screens/IngUsuario';
import IngCliente from '../screens/IngCliente';
import IngPedido from '../screens/IngPedido';
import VerCliente from '../screens/VerCliente';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
    <Drawer.Screen name="IngInventario" component={IngInventario} options={{ title: 'Ingresar Inventario' }} />
    <Drawer.Screen name="IngUsuario" component={IngUsuario} options={{ title: 'Ingresar Usuario' }} />
    <Drawer.Screen name="IngCliente" component={IngCliente} options={{ title: 'Ingresar Cliente' }} />
    <Drawer.Screen name="VerCliente" component={VerCliente} options={{ title: 'Ver Clientes' }} />
    <Drawer.Screen name="IngPedido" component={IngPedido} options={{ title: 'Ingresar Pedido' }} />
  </Drawer.Navigator>
);

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Iniciar Sesión',
          headerTitleStyle: { color: 'green' },
        }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;

