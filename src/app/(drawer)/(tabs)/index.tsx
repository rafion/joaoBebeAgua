import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StatusBar, View } from "react-native";
import { OrderList } from "@/components";

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
