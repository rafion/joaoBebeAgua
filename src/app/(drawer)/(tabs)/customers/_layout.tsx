import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function CustomerLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.orange[500] },
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center'

        }}>
            <Stack.Screen name="index" options={{ title: 'Clientes' }} />
            <Stack.Screen name="customer-form" options={{ title: 'Cliente' }} />

        </Stack>
    )
}