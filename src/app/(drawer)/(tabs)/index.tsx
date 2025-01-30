import { AppInputContainer, FloatButton, MenuButton, OrderList } from "@/components";
import Actions from "@/components/order/actions";
import { OrderStatus } from "@/model/order";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";

//import Constants from 'expo-constants';


//const statusBarHeight = Constants.statusBarHeight;
//style={{ marginTop: statusBarHeight }}

export default function Index() {

  const { id } = useLocalSearchParams();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus>(OrderStatus.CONFIRMED);

  useEffect(() => {
    setFilterStatus(OrderStatus.CONFIRMED);
  }, [id]);

  return (

    <View className="flex-1 bg-gray-900 pt-14 p-4" >
      <StatusBar backgroundColor="#0f172a" barStyle="light-content" />

      <AppInputContainer>
        <MenuButton />
        <AppInputContainer.InputField placeholder="Pesquisar nos pedidos" onChangeText={setSearch} />
      </AppInputContainer>

      <Actions filter={OrderStatus.CONFIRMED} setFilter={(s) => setFilterStatus(s)} />
      {(filterStatus == OrderStatus.CONFIRMED) &&
        (<OrderList searchTerms={search} filterStatus={filterStatus} />)}

      {(filterStatus == OrderStatus.CONCLUDED) &&
        (<OrderList searchTerms={search} filterStatus={filterStatus} />)}

      <FloatButton icon="add" label="Novo Pedido" action={() => router.navigate("/orders/order-customer-select")} />
    </View>



  );
}
