import { Order, OrderStatus } from "@/model/order";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { OrderItem } from "@/model/orderItem";
import { OrderCard } from "./order-card";
import { OrderDAO } from "@/database/orderDAO";
import { AppInputContainer } from "../input/app-Input";
import { MenuButton } from "../bottons/menu-button";
import { OrderFilterButtons } from "../bottons/order-filter-buttons";
import { FloatButton } from "../bottons/float-button";
import { router } from "expo-router";

// interface Props {
//     searchTerms: string;
//     filterStatus: OrderStatus;
// }

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
                        onConfirm={() => console.log("confirm")}
                        onCancel={() => console.log("cancel")}
                    />}
                horizontal={false}
                contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
            />

            <FloatButton icon="add" label="Novo Pedido" action={() => router.navigate("/orders/order-customer-select")} />
        </View>
    );
}
