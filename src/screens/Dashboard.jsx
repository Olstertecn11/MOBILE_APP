import React from 'react';
import { Box, Text, VStack, HStack, Center, Button } from 'native-base';
import { Circle } from 'react-native-progress'; // For circular progress
import { ScrollView } from 'react-native';

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECFFE6' }}>
      <VStack space={6} alignItems="center">
        {/* Month Selector */}
        <HStack space={10} justifyContent="center">
          <Button variant="link" colorScheme="muted">November</Button>
          <Text bold fontSize="lg" color="gray.500">December</Text>
          <Button variant="link" colorScheme="muted">October</Button>
        </HStack>

        {/* Earnings */}
        <Center>
          <Circle size={150} progress={0.75} thickness={8} color="green" showsText={true} />
          <Box position="absolute">
            <Text bold fontSize="2xl">Q1500</Text>
            <Text fontSize="md" color="gray.500">Ganancias</Text>
          </Box>
        </Center>

        {/* Top 5 Plants */}
        <Box w="80%" p={4} borderWidth={1} borderColor="black" rounded="md">
          <Text bold fontSize="lg" mb={2} textAlign="center">Top 5 plantas</Text>
          <HStack justifyContent="space-between">
            <VStack space={2}>
              <Text>1. Haworthias 50</Text>
              <Text>2. Cáctus 15</Text>
              <Text>3. Lithops 10</Text>
              <Text>4. Fittonia 9</Text>
              <Text>5. Nepenthes Gaya 5</Text>
            </VStack>
            <Circle size={70} progress={0.7} thickness={6} color="green" showsText={true} />
          </HStack>
        </Box>

        {/* Monthly Orders */}
        <Box w="40%" p={4} borderWidth={1} borderColor="black" rounded="md" alignItems="center">
          <Circle size={50} progress={0.26} thickness={6} color="green" showsText={true} />
          <Text bold mt={2}>26</Text>
          <Text>Pedidos Mensuales</Text>
        </Box>
      </VStack>
    </ScrollView>
  );
};

export default Dashboard;
