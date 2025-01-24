import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { Customer } from "@/model/customer";
import { CustomerDAO } from "@/database/customerDAO";
import { router } from "expo-router";
import { AppInputContainer, CustomerListItem, FloatButton } from "@/components";
import { colors } from "@/styles/colors";



export default function CustomerIndex() {

    const curtomerDao = CustomerDAO();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState("");
    const [isRefreshing, setRefreshing] = useState(false);

    //carregue a lista aqui
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

    async function remove(id: number) {
        try {
            await curtomerDao.deleteById(id)
            await list()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className="flex-1 bg-gray-900 pt-14 p-4 gap-4">
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
                            onDelete={() => remove(item.id!)}
                            onEdit={() => router.navigate({ pathname: '/customers/customer-form', params: { id: item.id } })}
                        />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.orange[500]}
                    />}
            />
            <FloatButton icon="add" label="Novo Cliente" action={() => router.navigate({ pathname: '/customers/customer-form' })} />
        </View>



    );
}
