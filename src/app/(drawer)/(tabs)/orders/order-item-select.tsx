import { Alert, FlatList, RefreshControl, Text, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { AppInputContainer, FloatButton, OrderListItem } from "@/components";
import { ItemDAO } from "@/database/itemDAO";
import { Item } from "@/model/item";
import { colors } from "@/styles/colors";
import { OrderItem } from "@/model/orderItem";
import { Order, OrderStatus } from "@/model/order";
import { CustomerDAO } from "@/database/customerDAO";
import { Customer } from "@/model/customer";


export default function OrderItemSelect() {

    const params = useLocalSearchParams<{ customerId: string, customerName: string }>()
    let orderItens: OrderItem[] = [];
    let order: Order;
    const itemDao = ItemDAO();
    const customerDao = CustomerDAO();

    const [customer, setCustomer] = useState<Customer>();
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (params.customerId) {
            customerDao.findById(Number(params.customerId))
                .then((response) => {
                    if (response) {
                        setCustomer(response);
                    }
                })
        }
        list();
    }, [search]);

    function createOrder() {
        order = new Order(customer!);

        if (orderItens.length > 0) {
            orderItens.forEach(item => order.addOrderItem(item));
        }
        order.calcTotalAmount();
    }

    function onStoreOrder() {
        if (orderItens.length == 0) {
            Alert.alert(
                'Nenhum item selecionado!',
                '',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
        else {
            storeOrder()
        }
    }

    async function storeOrder() {

        try {
            createOrder();
            const jsonValue = JSON.stringify(order);

            await AsyncStorage.setItem('order', jsonValue);

            router.push('/orders/details/[id]');
        } catch (error) {
            console.error(error)
        }

    }

    async function onRefresh() {
        setRefreshing(true);
        await list();
        setRefreshing(false)

    }

    async function list() {
        try {
            const response = await itemDao.searchByName(search)
            setItems(response)
        } catch (error) {
            console.log(error)
        }
    }


    function addOrderItem(q: number, item: Item) {
        let newOrderItem = new OrderItem(item.id, item.name, item.price, q);
        let index = orderItens.findIndex(e => e.itemId === item.id);

        //altera o que ja tem na lista ou adciona um novo
        if (index > -1) {
            orderItens.splice(index, 1, newOrderItem);
        } else {
            orderItens.push(newOrderItem);
        }

    }

    return (
        <View className="flex-1 bg-gray-900 pt-6 p-4 gap-4">
            <Text className="text-white">Cliente: {params.customerName}</Text>
            <AppInputContainer>
                <AppInputContainer.InputField placeholder="Pesquisar produtos" onChangeText={setSearch} />
            </AppInputContainer>

            <FlatList
                data={items}
                keyExtractor={item => String(item.id)}
                horizontal={false}
                contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({ item }) =>
                        <OrderListItem
                            data={item}
                            value={0}
                            onChangeQuantity={
                                (quantity) => {
                                    addOrderItem(quantity, item)
                                }}
                        />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.orange[500]}
                    />}
            />

            <FloatButton
                icon="arrow-circle-right"
                label="Avançar"
                position="right"
                action={() => { console.log("store"), onStoreOrder() }} />

        </View>

    )
}