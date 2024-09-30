import { Text, View } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import LoginScreen from './components/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Page() {

  const router = useRouter();

  const checkSession = async () => {
    const response = await AsyncStorage.getItem('user');
    if (response !== null) {
      router.replace('/Home');
    }
    console.log(response);
  }

  useEffect(() => {
    console.log('login');
    checkSession();

  }, []);
  return (
    <LoginScreen />
  )
}
