import type { ReactNode } from 'react';
import { Slot } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { SessionProvider } from '../context/SessionContext';

export default function RootLayout(): ReactNode {
  return (
    <NativeBaseProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </NativeBaseProvider>
  );
}
