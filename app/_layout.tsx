// app/_layout.tsx
import { Stack } from 'expo-router';
import { DataProvider } from '../src/context/DataContext';

export default function RootLayout() {
  return (
    // DataProvider wraps the entire app, making the context available everywhere
    <DataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  );
}