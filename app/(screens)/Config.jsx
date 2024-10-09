
import React, { useState, useContext, useEffect } from 'react';
import { Select, Box, Input, VStack, CloseIcon, Button, Avatar, HStack, Text, IconButton, ScrollView, Center, useToast, Spinner } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SessionContext } from '../../context/SessionContext';
import { updateUser } from '../../services/user';

const Config = () => {
  const { user, saveSession, token } = useContext(SessionContext);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [roleId, setRoleId] = useState(user?.role_id?.toString() || '');
  const [imageUri, setImageUri] = useState(user?.imageUri || 'https://via.placeholder.com/150');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      toast.show({
        title: "Permiso denegado",
        status: "error",
        placement: "top",
        duration: 2000,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;
      const fileUri = await saveImageToFileSystem(base64Image);

      if (fileUri && fileUri.startsWith('file://')) {
        setImageUri(`${fileUri}?timestamp=${new Date().getTime()}`);
      }
    }
  };

  const saveImageToFileSystem = async (base64Image) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}profile_image.png`;
      const cleanedBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
      await FileSystem.writeAsStringAsync(fileUri, cleanedBase64, { encoding: FileSystem.EncodingType.Base64 });
      return fileUri;
    } catch (error) {
      console.error('Error al guardar la imagen en el sistema de archivos:', error);
      return null;
    }
  };
  const showCustomToast = (message, bgColor) => {
    toast.show({
      placement: "top-right",
      duration: 3000,
      render: () => (
        <Box bg={bgColor} px="4" py="2" rounded="md" mb={5}>
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <Text color="white" fontWeight="bold">{message}</Text>
            <IconButton icon={<CloseIcon size="xs" color="white" />} onPress={() => toast.closeAll()} />
          </HStack>
        </Box>
      ),
    });
  };

  useEffect(() => {
    console.log('changing image');
  }, [imageUri]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let base64Image = imageUri;

      if (imageUri && imageUri.startsWith('file://')) {
        const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
        base64Image = `data:image/jpeg;base64,${base64}`;
      }

      const user_updated = { username, email, role_id: roleId, image: base64Image };
      const update_profile = await updateUser(user.id, user_updated);

      if (update_profile.status === 200) {
        saveSession(user_updated, token);
        showCustomToast('Perfil Actualizado', 'green.500');
        setLoading(false);
        return;
      }

      showCustomToast('Error al actualizar perfil', 'red.500');
    } catch (error) {
      showCustomToast(`Error ${error}`, 'red.500');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Center mt={10}>
        <VStack space={4} width="90%">
          <Center>
            <HStack position={'relative'}>
              <Avatar size="xl" source={{ uri: imageUri ? imageUri : 'https://via.placeholder.com/150' }} />
              <IconButton
                position={'absolute'}
                right={'-10%'}
                top={'-10%'}
                icon={<FontAwesome name="exchange" size={16} color="gray" />}
                onPress={pickImage}
              />
            </HStack>
            <Text mt={2} bold fontSize="lg">{username || 'Username'}</Text>
            <Text fontSize="sm" color="gray.500">{email || 'user@gmail.com'}</Text>
          </Center>

          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            variant="filled"
            size="lg"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          />

          <Select
            selectedValue={roleId}
            minWidth="200"
            accessibilityLabel="Seleccionar Rol"
            placeholder="Seleccionar Rol"
            onValueChange={setRoleId}
            mt={1}
            size="lg"
            variant="filled"
            bg="white"
            borderRadius="10"
            _focus={{ borderColor: "gray.500" }}
          >
            <Select.Item label="Administrador" value="1" />
            <Select.Item label="Vendedor" value="2" />
          </Select>

          <Text textAlign={'right'} color={'success.700'} onPress={() => navigation.navigate('ChangePassword')}>Cambiar Contraseña</Text>

          <Button onPress={handleUpdate} colorScheme="green" mt={4}>
            {loading ? <Spinner color="white" size="sm" /> : 'Actualizar Perfil'}
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default Config;

