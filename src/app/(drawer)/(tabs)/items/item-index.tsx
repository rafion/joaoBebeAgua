import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { router } from "expo-router";

import { AppInputContainer, FloatButton, ItemListItem } from "@/components";
import { colors } from "@/styles/colors";
import { ItemDAO } from "@/database/itemDAO";
import { Item } from "@/model/item";



export default function ItemIndex() {

    const itemDao = ItemDAO();
    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(() => {

        list();
    }, [search])


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

    async function remove(id: number) {
        try {
            await itemDao.deleteById(id)
            await list()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className="flex-1 bg-gray-900 pt-14 p-4 gap-4">
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
                        <ItemListItem
                            data={item}
                            selectionMode={false}
                            onSelect={() => { }}
                            onDelete={() => remove(item.id!)}
                            onEdit={() => router.navigate({ pathname: '/items/item-form', params: { id: item.id } })}
                        />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.orange[500]}
                    />}
            />
            <FloatButton icon="add" label="Novo Produto" action={() => router.navigate({ pathname: '/items/item-form' })} />
        </View>



    );
}
