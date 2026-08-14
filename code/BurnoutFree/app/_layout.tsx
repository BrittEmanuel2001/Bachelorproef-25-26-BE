import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="breathing-intro" />
        <Stack.Screen name="meditation" 
          options={{
            animation: "none",
            presentation: "transparentModal",
            contentStyle: { backgroundColor: "transparent" },
          }} />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

