import { Order } from "@/model/order";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { OrderListItem } from "./order-list-item";
import { OrderItem } from "@/model/orderItem";


export function OrderList() {

    let orderList: Order[] = [];
    let order1 = new Order({ id: 1, name: "rafa" });
    order1.id = 1;
    order1.customerId = 1;
    order1.customerName = "Cliente teste11";
    order1.status = "CONFIRMED";
    order1.deliveryDate = new Date();
    order1.orderAmount = 36.15;
    order1.city = "Aracaju";
    order1.streetName = "Rua santa rosa";
    order1.streetNumber = "363";
    order1.complement = "Loja1";
    order1.reference = "Em frente a loja x23";
    order1.addOrderItem(new OrderItem(1, "Agua 12L", 7.5, 2))
    order1.addOrderItem(new OrderItem(2, "Agua 6L", 115, 1))
    orderList.push(order1);

    let order2 = new Order({ id: 1, name: "rafafa" });
    order2.id = 2;
    order2.customerId = 2;
    order2.customerName = "Cliente teste13";
    order2.status = "CONFIRMED";
    order2.deliveryDate = new Date();
    order2.orderAmount = 50;
    order2.city = "Aracaju";
    order2.streetName = "Rua santa rosa2";
    order2.streetNumber = "364";
    order2.complement = "Loja3";
    order2.reference = "Em frente a loja x38";
    order2.addOrderItem(new OrderItem(1, "Agua 12L", 7.5, 2));
    order2.addOrderItem(new OrderItem(2, "Gás", 115, 1));
    order2.addOrderItem(new OrderItem(3, "botijão de Gás 15lt", 115, 1))
    orderList.push(order2);

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function getOrders() {
            //const response = await fetch("http://192.168.1.9:3000/restaurants");
            //const data = await response.json();
            setOrders(orderList);
        }
        getOrders();
    }, [])

    return (

        <FlatList
            data={orders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <OrderListItem order={item} />}
            horizontal={false}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />
    );
}
