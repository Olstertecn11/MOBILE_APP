
import { useEffect } from "react";
import { useRouter } from "expo-router";
import LoginScreen from './components/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page() {
  const router = useRouter();

  const checkSession = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log('Checking session...');

      if (user !== null) {
        console.log('Session found, redirecting to /Home');
        router.replace('/Home'); // Redirige si hay una sesión activa
      } else {
        console.log('No session found, staying on login screen');
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return <LoginScreen />;
}

