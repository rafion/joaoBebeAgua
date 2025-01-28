//import { useEffect } from "react";
//import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native"
import { AppInputContainer, FloatButton } from "@/components";
//import { useNavigation } from "@react-navigation/native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";


export default function OrderItemSelect() {

    const params = useLocalSearchParams<{ customerId: string, customerName: string }>()

    // const navigation = useNavigation();
    // //const nav = useNavigation<any>();

    useEffect(() => {
        console.log("nome do cliente " + params.customerName);
    }, [params.customerId]);

    return (
        <View className="flex-1 bg-gray-900 pt-4 p-4" >
            <Text className="pb-4 font-subtitle text-white">Cliente: {params.customerName}</Text>
            <AppInputContainer>
                {/* <MenuButton /> */}
                <AppInputContainer.InputField placeholder="Pesquisar produtos" />
            </AppInputContainer>

            {/* <FloatButton icon="arrow-circle-left" label="Retornar" position="left" action={() => nav.navigate('orders', {
                screen: 'order-customer-select',
                initial: false
            })}
            /> */}

            <FloatButton
                icon="arrow-circle-right"
                label="Avançar"
                position="right"
                action={() => router.navigate('/orders/details/[id]')} />

        </View>

    )
}