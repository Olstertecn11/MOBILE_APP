

import React from 'react';
import styled from 'styled-components/native';
import { Image, Text } from 'react-native';
import logo from '../assets/logo.png';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #ECFFE6;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 16px;
  color: #262A26;
  font-weight: bold;
  
`;

const HomeScreen = () => (
  <Container >
    <Image source={logo} style={{ width: 400, height: 400 }} />
    <Title>Bienvenido a la aplicación</Title>
  </Container>
);

export default HomeScreen;
