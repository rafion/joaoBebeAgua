import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from "react-native";
import { TextInputMask } from 'react-native-masked-text';

import { AppInputContainer } from "@/components";
import { ItemDAO } from "@/database/itemDAO";
import { Item } from "@/model/item";
import { colors } from "@/styles/colors";

export default function ItemForm() {

    const itemDao = ItemDAO();
    const params = useLocalSearchParams<{ id: string }>()

    const [id, setId] = useState("")
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (params.id) {
            itemDao.findById(Number(params.id))
                .then((response) => {
                    if (response) {
                        setData(response);
                    }
                })
        }
    }, [params.id])

    function setData(item: Item) {
        setId(String(item.id));
        setName(item.name);
        setPrice(item.price);

    }

    function validForm(): boolean {
        if (name == "") {
            Alert.alert("Nome", "O nome precisa ser preechido!")
            return false;
        }
        return true;
    }

    async function existsByName(name: string) {
        const response = await itemDao.existsByName(name);
        if (response) {
            Alert.alert("Produto", "ja existe!");
            return true
        }
        return false;

    }

    async function create() {
        try {
            if (!validForm()) {
                return
            }

            if (await existsByName(name)) {
                return
            }

            const response = await itemDao.create({
                name, price: Number(price)
            })

            setId(response.insertedRowId);
            Alert.alert("produto cadastrado com o ID: " + response.insertedRowId)
            router.navigate({ pathname: '/items/item-index', params: { refresh: "1" } })
        } catch (error) {
            console.log(error)
        }

    }

    async function update() {
        try {
            if (!validForm()) {
                return
            }

            const response = await itemDao.update({
                id: Number(id), name, price: Number(price)
            })
            Alert.alert("Produto atualizado!")
        } catch (error) {
            console.log(error)
        }
    }

    function onSubmit() {
        if (id) {
            update()
        } else {
            create()
        }
    }

    return (
        // solução para teclado em cima do input
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={85}>
            <ScrollView className="w-full h-full bg-gray-900">

                <View className="flex-1 pt-14 p-4 gap-4" >
                    <AppInputContainer>

                        <AppInputContainer.InputField placeholder="Nome" defaultValue={name}
                            onChangeText={setName} />
                    </AppInputContainer>

                    {/* <AppInput>

                       
                        <AppInput.Field placeholder="Valor Unitario" keyboardType="decimal-pad" defaultValue={price}
                            onChangeText={setPrice} /> 
                    </AppInput>*/}


                    <TextInputMask
                        type={'money'}
                        value={String(price)}
                        maxLength={18}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: ''
                        }}
                        onChangeText={value => {
                            //setPriceCurrency(value);
                            value = value.replace('R$', '').replace('.', '').replace(',', '.');
                            setPrice(Number(value))
                        }}
                        style={styles.input}
                    />


                    {/* <Text> formato de moeda visivel: {priceCurrency}</Text>
                    <Text> formato de number a pesistir: {price}</Text> */}

                    <Button title="Salvar" color={colors.orange[500]} onPress={onSubmit} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    //w-full h-14 bg-gray-800 rounded-lg px-4 flex-row items-center gap-4
    input: {
        width: "auto",
        backgroundColor: '#2A2B2D',
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "white"

    }
})