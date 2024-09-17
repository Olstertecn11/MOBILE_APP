
// components/CustomDrawerContent.js
import React from 'react';
import { Box, Text, VStack, Pressable, HStack, Avatar, Button } from 'native-base';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* User Profile Section */}
      <Box bg="green.100" p={4} mb={2}>
        <HStack space={3} alignItems="center">
          <Avatar
            size="lg"
            source={{
              uri: 'https://example.com/user-avatar.png',
            }}
          />
          <VStack>
            <Text bold fontSize="lg">Luis Franco</Text>
            <Text>@lfranco</Text>
          </VStack>
        </HStack>
      </Box>

      <VStack space={4} px={4}>
        <Pressable onPress={() => props.navigation.navigate('Home')}>
          <Text>Home</Text>
        </Pressable>
      </VStack>

      <Box p={4} mt={4}>
        <Button colorScheme="green" onPress={() => alert('Logging Off')}>
          Log Off
        </Button>
      </Box>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
