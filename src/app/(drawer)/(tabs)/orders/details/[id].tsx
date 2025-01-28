import { FloatButton } from "@/components";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function OrderForm() {

    const nav = useNavigation<any>();

    useEffect(() => {
        nav.setOptions({ headerShown: true, headerTitle: 'Finalizar Pedido' });
    }, [nav]);


    return (
        <View className="flex-1 bg-gray-900 pt-14 p-4 items-center justify-center">
            <Text className="text-white text-2xl font-heading">order form</Text>

            <FloatButton
                icon="save"
                label="Finalizar"
                position="right"
                action={() => {
                    console.log("salvar"),
                        router.navigate('/(drawer)/(tabs)')
                }} />

        </View>

    )
}