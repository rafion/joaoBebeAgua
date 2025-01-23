import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Customer } from "@/model/customer";
import { CustomerListItem } from "./customer-list-item";
import { CustomerDAO } from "@/database/customerDAO";



export function CustomerList() {

    let customerList: Customer[] = [];
    let customer1 = new Customer(1, 'Rafael');
    let customer2 = new Customer(2, 'joao');

    let customer3 = new Customer(3, 'jose');
    customer3.city = "Aracaju-SE";
    customer3.district = "Farolândia"
    customer3.streetName = "Av. caçula barreto";
    customer3.streetNumber = "246";
    customer3.complement = "AP 402"
    customer3.reference = "Em frente ao G barbosa";

    customerList.push(customer1);
    customerList.push(customer2);
    customerList.push(customer3);

    const curtomerDb = CustomerDAO();
    const [customers, setCustomers] = useState<Customer[]>([]);


    useEffect(() => {
        async function getCustomers() {
            //const response = await fetch("http://192.168.1.9:3000/restaurants");
            //const data = await response.json();
            setCustomers(customerList);
        }
        getCustomers();
    }, [])

    // async function list() {
    //     try {
    //         const response = await curtomerDb.searchByName(search)
    //         setCustomers(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (

        <FlatList
            data={customers}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <CustomerListItem customer={item} />}
            horizontal={false}
            contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
            showsHorizontalScrollIndicator={false}
        />


    );
}
