import { AppInput } from "@/components";
import { CustomerDAO } from "@/database/customerDAO";
import { Customer } from "@/model/customer";
import { colors } from "@/styles/colors";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Button, View } from "react-native";

export default function CustomerForm() {
    // const { id } = useLocalSearchParams<{ id: string }>();
    // console.log("chegou aqui no custoemr form: id: " + idParam);

    const [id, setId] = useState("")
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [streetName, setStreetName] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [reference, setReference] = useState("");

    const curtomerDb = CustomerDAO();

    function validForm(): boolean {
        if (isNaN(Number(streetNumber))) {
            Alert.alert("Numero da Rua", "O numero da rua precisa ser um número!")
            return false;
        }
        return true;
    }


    async function create() {
        try {
            if (!validForm()) {
                return
            }

            const response = await curtomerDb.create({
                name
            })

            Alert.alert("Cliente cadastrado com o ID: " + response.insertedRowId)
        } catch (error) {
            console.log(error)
        }
        console.log("create: " + name);
    }

    async function update() {
        try {
            if (!validForm()) {
                return
            }

            const response = await curtomerDb.update({
                name
            })
            Alert.alert("Cliente atualizado!")
        } catch (error) {
            console.log(error)
        }
    }

    function handleSave() {
        if (id) {
            update()
        } else {
            create()
        }
    }

    return (
        <View className="flex-1 bg-gray-900 pt-14 p-4 gap-4" >
            <AppInput>
                <AppInput.Field placeholder="Nome" defaultValue={name}
                    onChangeText={setName} />
            </AppInput>
            <AppInput>
                <AppInput.Field placeholder="Cidade" defaultValue={city}
                    onChangeText={setCity} />
            </AppInput>
            <AppInput>
                <AppInput.Field placeholder="Bairro" defaultValue={district}
                    onChangeText={setDistrict} />
            </AppInput>
            <AppInput>
                <AppInput.Field placeholder="Rua" defaultValue={streetName}
                    onChangeText={setStreetName} />
            </AppInput>
            <AppInput>
                <AppInput.Field placeholder="Numero" defaultValue={streetNumber}
                    onChangeText={setStreetNumber} />
            </AppInput>
            <AppInput>
                <AppInput.Field placeholder="Complemento" defaultValue={complement}
                    onChangeText={setComplement} />
            </AppInput>
            <AppInput>
                <AppInput.Field placeholder="Referencia" defaultValue={reference}
                    onChangeText={setReference} />
            </AppInput>


            <Button title="Salvar" color={colors.orange[500]} onPress={handleSave} />
        </View>
    )
}