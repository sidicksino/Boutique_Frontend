import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="loginScreen" />
      </Stack>
      <StatusBar style="auto" />
      </SafeScreen>
    </>
  );
}
