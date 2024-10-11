
import React from 'react';
import { Center, Spinner, Text } from 'native-base';

export default function Loader({ isLoading }) {
  return (
    <>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="lg" color="green.500" />
          <Text mt={4} fontSize="md" color="green.500">
            Cargando...
          </Text>
        </Center>
      )}
    </>
  );
}
