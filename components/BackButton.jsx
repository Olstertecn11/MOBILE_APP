import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from 'native-base';
import { useRouter } from 'expo-router';

export default function BackButton({ route = 'Home' }) {
  const router = useRouter();

  return (
    <Button onPress={() => router.push(route)} _pressed={{ bg: 'green.500', color: 'white' }} mt={10} w={'15%'} ml={4} bg={'gray.100'}><AntDesign name="back" size={20} color="black" /></Button>
  )
}
