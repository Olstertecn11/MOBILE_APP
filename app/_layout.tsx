import type { ReactNode } from 'react';
import { Slot } from 'expo-router';
import { NativeBaseProvider } from 'native-base';

export default function RootLayout(): ReactNode {
  return (
    <NativeBaseProvider>
      <Slot />
    </NativeBaseProvider>
  );
}
