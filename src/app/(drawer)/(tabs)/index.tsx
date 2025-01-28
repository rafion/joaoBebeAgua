import { AppInputContainer, FloatButton, MenuButton, OrderList } from "@/components";
import Actions from "@/components/order/actions";
import { router } from "expo-router";
import { useState } from "react";
import { StatusBar, Text, View } from "react-native";

//import Constants from 'expo-constants';


//const statusBarHeight = Constants.statusBarHeight;
//style={{ marginTop: statusBarHeight }}

export default function Index() {

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(true);

  return (

    <View className="flex-1 bg-gray-900 pt-14 p-4" >
      <StatusBar backgroundColor="#0f172a" barStyle="light-content" />

      <AppInputContainer>
        <MenuButton />
        <AppInputContainer.InputField placeholder="Pesquisar nos pedidos" onChangeText={setSearch} />
      </AppInputContainer>

      <Actions filter={true} setFilter={(status) => console.log(status)} />
      {filterStatus &&
        (<OrderList searchTerms={search} filterStatus={filterStatus} />)}

      {!filterStatus &&
        (<OrderList searchTerms={search} filterStatus={filterStatus} />)}

      <FloatButton icon="add" label="Novo Pedido" action={() => router.navigate("/orders/order-customer-select")} />
    </View>



  );
}
