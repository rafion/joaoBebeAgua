
//import { useNavigation } from "@react-navigation/native";
//import { useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native"
import { AppInputContainer, CustomerListItem, FloatButton } from "@/components";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { CustomerDAO } from "@/database/customerDAO";
import { Customer } from "@/model/customer";
import { colors } from "@/styles/colors";

export default function OrderCustomerSelect() {

    const curtomerDao = CustomerDAO();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState("");
    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(() => {
        list()
    }, [search])

    async function onRefresh() {
        setRefreshing(true);
        await list();
        setRefreshing(false)

    }

    async function list() {
        try {
            const response = await curtomerDao.searchByName(search)
            setCustomers(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View className="flex-1 bg-gray-900 pt-14 p-4 gap-4" >

            <AppInputContainer>
                <AppInputContainer.InputField placeholder="Pesquisar clientes" onChangeText={setSearch} />
            </AppInputContainer>

            <FlatList
                data={customers}
                keyExtractor={item => String(item.id)}
                horizontal={false}
                contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({ item }) =>
                        <CustomerListItem
                            data={item}
                            selectionMode={true}
                            onSelect={() => { router.navigate({ pathname: '/orders/order-item-select', params: { customerId: item.id, customerName: item.name } }) }}
                            onDelete={() => { }}
                            onEdit={() => { }}
                        />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.orange[500]}
                    />}
            />
            {/* <FloatButton
                icon="arrow-circle-right"
                label="Avançar"
                position="right"
                action={() => router.navigate('/orders/order-item-select')}
            /> */}

        </View>

    )
}