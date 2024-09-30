import type { ReactNode } from 'react';
import { Slot } from 'expo-router';

export default function RootLayout(): ReactNode {
  return (
    <Slot />
  );
}
