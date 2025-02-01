import { AppInputContainer } from "@/components";
import { CustomerDAO } from "@/database/customerDAO";
import { Customer } from "@/model/customer";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function CustomerForm() {

    const curtomerDao = CustomerDAO();
    const params = useLocalSearchParams<{ id: string }>()

    const [id, setId] = useState("")
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [streetName, setStreetName] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [reference, setReference] = useState("");



    useEffect(() => {
        if (params.id) {
            curtomerDao.findById(Number(params.id))
                .then((response) => {
                    if (response) {
                        setData(response);
                    }
                })
        }
    }, [params.id])

    function setData(customer: Customer) {
        setId(String(customer.id));
        setName(customer.name);
        setCity(customer.city || "");
        setDistrict(customer.district || "");
        setStreetName(customer.streetName || "");
        setStreetNumber(customer.streetNumber || "");
        setComplement(customer.complement || "");
        setReference(customer.reference || "");
    }

    function validForm(): boolean {
        if (name == "") {
            Alert.alert("Nome", "O nome precisa ser preechido!")
            return false;
        }

        if (isNaN(Number(streetNumber))) {
            Alert.alert("Numero da Rua", "O numero da rua precisa ser um número!")
            return false;
        }

        return true;
    }

    async function existsByName(name: string) {
        const response = await curtomerDao.existsByName(name);
        if (response != undefined && response > 0) {
            Alert.alert("Cliente", "ja existe!");
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

            const response = await curtomerDao.create({
                name, city, district, streetName, streetNumber, complement, reference
            })

            setId(response.insertedRowId);
            Alert.alert("Cliente cadastrado com o ID: " + response.insertedRowId)
            router.navigate({ pathname: '/customers/customer-index', params: { refresh: "1" } })
        } catch (error) {
            console.log(error)
        }

    }

    async function update() {
        try {
            if (!validForm()) {
                return
            }
            //verificar se o cliente ja existe e o id é diferente deste

            const response = await curtomerDao.update({
                id: Number(id), name, city, district, streetName, streetNumber, complement, reference
            })
            Alert.alert("Cliente atualizado!")

            router.navigate({ pathname: '/customers/customer-index', params: { refresh: "1" } })
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
                    <AppInputContainer>
                        <AppInputContainer.InputField placeholder="Cidade" defaultValue={city}
                            onChangeText={setCity} />
                    </AppInputContainer>
                    <AppInputContainer>
                        <AppInputContainer.InputField placeholder="Bairro" defaultValue={district}
                            onChangeText={setDistrict} />
                    </AppInputContainer>
                    <AppInputContainer>
                        <AppInputContainer.InputField placeholder="Rua" defaultValue={streetName}
                            onChangeText={setStreetName} />
                    </AppInputContainer>
                    <AppInputContainer>
                        <AppInputContainer.InputField placeholder="Numero" keyboardType="numeric" defaultValue={streetNumber}
                            onChangeText={setStreetNumber} />
                    </AppInputContainer>
                    <AppInputContainer>
                        <AppInputContainer.InputField placeholder="Complemento" defaultValue={complement}
                            onChangeText={setComplement} />
                    </AppInputContainer>
                    <AppInputContainer>
                        <AppInputContainer.InputField placeholder="Referencia" defaultValue={reference}
                            onChangeText={setReference} />
                    </AppInputContainer>


                    <Button title="Salvar" color={colors.orange[500]} onPress={onSubmit} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}