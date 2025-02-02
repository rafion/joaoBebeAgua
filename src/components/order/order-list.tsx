import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { Order, OrderStatus } from "@/model/order";
import { router } from "expo-router";

import { OrderCard } from "./order-card";
import { OrderDAO } from "@/database/orderDAO";
import { AppInputContainer } from "../input/app-Input";
import { MenuButton } from "../bottons/menu-button";
import { OrderFilterButtons } from "../bottons/order-filter-buttons";
import { FloatButton } from "../bottons/float-button";



export function OrderList() {

    const orderDao = OrderDAO();

    const [search, setSearch] = useState("");
    const [orderStatus, setOrderStatus] = useState<OrderStatus>(OrderStatus.CONFIRMED);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        list();
    }, [search, orderStatus])

    async function list() {
        try {
            const response = await orderDao.searchByCustomerNameAndStatus(search, orderStatus)
            setOrders(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function conclude(orderId: number) {
        try {
            const response = await orderDao.conclude(orderId);
            Alert.alert("Pedido concluido!")
            list();
        } catch (error) {
            console.log(error)
        }
    }

    function onCancel(order: Order) {
        Alert.alert(
            'Deseja cancelar este pedido? n° ' + order.id,
            'cliente: ' + order.customerName,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => cancel(order.id!) },
            ],
            { cancelable: false }
        )
    }

    async function cancel(orderId: number) {
        try {
            const response = await orderDao.cancel(orderId);

            list();
        } catch (error) {
            console.log(error)
        }
    }

    async function onDelete(order: Order) {
        Alert.alert(
            'Deseja remover definitivamente este pedido? n° ' + order.id,
            'cliente: ' + order.customerName,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => remove(order!) },
            ],
            { cancelable: false }
        )
    }

    async function remove(order: Order) {
        try {
            const response = await orderDao.deleteById(order.id!);

            list();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className="flex-1 bg-gray-900 pt-4 p-4 gap-4">

            <AppInputContainer>
                <MenuButton />
                <AppInputContainer.InputField placeholder="Pesquisar nos pedidos" onChangeText={setSearch} />
            </AppInputContainer>

            <OrderFilterButtons filter={OrderStatus.CONFIRMED} setFilter={(s) => setOrderStatus(s)} />

            <FlatList
                data={orders}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) =>
                    <OrderCard
                        order={item}
                        onConclude={() => conclude(item.id!)}
                        onCancel={() => onCancel(item!)}
                        onDelete={() => onDelete(item!)}
                    />}
                horizontal={false}
                contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
            />

            <FloatButton icon="add" label="Novo Pedido" action={() => router.navigate("/orders/order-customer-select")} />
        </View>
    );
}
