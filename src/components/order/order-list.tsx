import { Order, OrderStatus } from "@/model/order";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { OrderItem } from "@/model/orderItem";
import { OrderCard } from "./order-card";
import { OrderDAO } from "@/database/orderDAO";

interface Props {
    searchTerms: string;
    filterStatus: OrderStatus;
}

export function OrderList({ searchTerms, filterStatus }: Props) {

    const orderDao = OrderDAO();

    const [search, setSearch] = useState(searchTerms);
    const [status, setStatus] = useState(filterStatus);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        list();
    }, [search, status])

    async function list() {
        try {
            const response = await orderDao.searchByCustomerNameAndStatus(search, status)
            setOrders(response)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className="flex-1 bg-gray-900 pt-4 p-4 gap-4">

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
        </View>
    );
}
