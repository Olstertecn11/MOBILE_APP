
import React from 'react';
import { View, Image, Text } from 'react-native';
import logo from '../../assets/images/logo.png';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center'
      }}
    >
      <Image
        source={logo}
        style={{ width: 400, height: 350 }}
        resizeMode="contain"
      />
      <Text style={{ color: '#97C24D', fontSize: 20, fontWeight: 'bold' }}>Bienvenido a la aplicación</Text>
    </View>
  );
}

