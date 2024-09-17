
// App.js
import 'react-native-gesture-handler'; // Import this at the very top

import React from 'react';
import StackNavigator from './src/components/createStackNavigator';
import { NativeBaseProvider } from 'native-base'

const App = () => (
  <NativeBaseProvider>
    <StackNavigator />
  </NativeBaseProvider>
);

export default App;

