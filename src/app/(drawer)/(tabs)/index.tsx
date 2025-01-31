import { AppInputContainer, FloatButton, MenuButton, OrderFilterButtons, OrderList } from "@/components";
import { OrderStatus } from "@/model/order";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";

//import Constants from 'expo-constants';


//const statusBarHeight = Constants.statusBarHeight;
//style={{ marginTop: statusBarHeight }}

export default function Index() {

  const params = useLocalSearchParams<{ refresh: string }>()
  const [isRefreshing, setRefreshing] = useState(true);

  useEffect(() => {
    if (params.refresh) {
      setRefreshing(false)
    }
  }, [params.refresh]);


  return (

    <View className="flex-1 bg-gray-900 pt-14 p-4" >
      <StatusBar backgroundColor="#0f172a" barStyle="light-content" />

      <OrderList />

    </View>

  );
}
