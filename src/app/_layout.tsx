import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from "@expo-google-fonts/roboto";

import { migrateDbIfNeeded } from "../database/migrateDbIfNeeded";

import "../styles/global.css";
import { StatusBar } from "react-native";
import { Loading } from "@/components";


export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (

    <SQLiteProvider databaseName="joaoBebeAguaDb.db" onInit={migrateDbIfNeeded}>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <Slot />
      </GestureHandlerRootView>

    </SQLiteProvider>


  )

}