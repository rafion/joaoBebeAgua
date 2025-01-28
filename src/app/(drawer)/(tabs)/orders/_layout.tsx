import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function OrderLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.orange[500] },
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',

        }}>
            <Stack.Screen name="order-customer-select" options={{ title: 'Selecione o cliente' }} />
            <Stack.Screen name="order-item-select" options={{ title: 'Selecione os itens' }} />
        </Stack>
    )
}