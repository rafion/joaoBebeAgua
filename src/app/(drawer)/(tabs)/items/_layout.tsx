import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function ItemLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.orange[500] },
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',

        }}>
            <Stack.Screen name="item-index" options={{ title: 'Produtos' }} />
            <Stack.Screen name="item-form" options={{ title: 'Produto' }} />

        </Stack>
    )
}