import { AppInput, CustomerList } from "@/components";
import { useState } from "react";
import { View } from "react-native";


export default function Index() {
    const [search, setSearch] = useState("");

    return (

        <View className="flex-1 bg-gray-900 pt-14 p-4">

            <AppInput>
                <AppInput.Field placeholder="Pesquisar clientes" onChangeText={setSearch} />
            </AppInput>

            <CustomerList />

        </View>
    )
}