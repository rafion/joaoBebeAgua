import { router, useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { FloatButton } from "@/components";
import { Order } from "@/model/order";
import { getFormattedCurrency } from "@/utils/format-values";

import { OrderItem } from "@/model/orderItem";
import { OrderDAO } from "@/database/orderDAO";

export default function OrderForm() {

    const { orderId } = useLocalSearchParams();
    const nav = useNavigation<any>();
    const [order, setOrder] = useState<Order>();

    const orderDao = OrderDAO();

    useEffect(() => {
        nav.setOptions({ headerShown: true, headerTitle: 'Detalhes do pedido' });
        setOrderFroAsyncStorage();
    }, [nav]);


    function onSubmit() {
        if (order?.id) {
            update()
        } else {
            create()
        }
    }

    async function create() {
        console.log("salve");

        try {
            const response = await orderDao.create(order!);
            Alert.alert("Pedido cadastrado com o ID: " + response.insertedRowId);

            router.navigate({ pathname: '/(drawer)/(tabs)', params: { refresh: 1 } })
        } catch (error) {
            console.error(error)
        }


    }

    function update() {
        console.log("update");
    }

    async function setOrderFroAsyncStorage() {
        try {
            const jsonValue = await AsyncStorage.getItem('order');
            if (jsonValue != null) {
                let o = JSON.parse(jsonValue) as Order;
                setOrder(o);

            }

        } catch (e) {
            console.error(e);
        }
    };

    function printAddress() {
        return ((order?.streetName != "") ? order?.streetName : "")
            + ((order?.streetNumber != "") ? (", : " + order?.streetNumber) : "")
            + ((order?.complement != "") ? (", " + order?.complement) : "")
            + ((order?.reference != "") ? (", ref.: " + order?.reference) : "");

    }


    return (
        <View className="flex-1 bg-gray-900 pt-6 p-4 gap-4">
            <Text className="text-gray-400 text-2xl">Cliente: {order?.customerName}</Text>
            <Text className="text-gray-400 text-xl" numberOfLines={2}>Endereço: {printAddress()}</Text>


            <FlatList
                data={order?.items}
                keyExtractor={(item: OrderItem) => String(item.index)}
                horizontal={false}
                contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({ item }) =>
                        <View className="bg-gray-600 rounded-md pt-4 p-4 gap-4">
                            <Text className="text-lg font-subtitle text-gray-400" numberOfLines={3}>
                                #{item.index} - {item.itemName}
                            </Text>
                            <Text className="ml-6 text-lg font-subtitle text-gray-400">
                                {item.quantity} x {getFormattedCurrency(item.unitPrice)} Total: {getFormattedCurrency(item.price)}
                            </Text>
                        </View>
                }
            />


            <View className=" px-4 py-3 bg-gray-600 rounded-full w-80 absolute bottom-4 
            gap-1 flex-row items-center">
                {<Text className="text-xl text-orange-500" >Total: {getFormattedCurrency(order?.orderAmount || 0)} </Text>}
            </View>
            <FloatButton
                icon="save"
                label="Salvar"
                position="right"
                action={() => onSubmit()} />



        </View>

    )
}