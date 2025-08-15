import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AdminLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="ProductAdmin" />
        <Stack.Screen name="AddCategory" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
