// screens/HomeScreen.js
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
`;

const HomeScreen = () => (
  <Container>
    <Title>Home Screen</Title>
  </Container>
);

export default HomeScreen;
