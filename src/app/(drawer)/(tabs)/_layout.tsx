import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                minHeight: 54
            },
            tabBarActiveTintColor: colors.orange[500],
            tabBarInactiveTintColor: colors.gray[400]
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerTitle: 'Home',
                    tabBarIcon: ({ size, color }) => (<MaterialIcons name="home" size={size} color={color} />)
                }} />
            <Tabs.Screen
                name="customers"
                options={{
                    title: 'Clientes',
                    headerTitle: 'Clientes',
                    tabBarIcon: ({ size, color }) => (<MaterialIcons name="person" size={size} color={color} />)
                }} />
            <Tabs.Screen
                name="item-form"
                options={{
                    title: 'produtos',
                    headerTitle: 'Produtos',
                    tabBarIcon: ({ size, color }) => (<MaterialIcons name="shopping-cart" size={size} color={color} />)
                }} />

        </Tabs>)
}