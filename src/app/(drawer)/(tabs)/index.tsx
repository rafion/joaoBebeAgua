import { StatusBar, View } from "react-native";

//import Constants from 'expo-constants';
import { FloatButton, AppInputContainer, MenuButton, OrderList } from "@/components";

//const statusBarHeight = Constants.statusBarHeight;
//style={{ marginTop: statusBarHeight }}

export default function Index() {



  return (


    <View className="flex-1 bg-gray-900 pt-14 p-4" >
      <StatusBar backgroundColor="#0f172a" barStyle="light-content" />
      {/* <Text className="text-white text-lg font-bold ">João Bebe Água</Text> */}

      <AppInputContainer>
        <MenuButton />
        <AppInputContainer.InputField placeholder="Pesquisar nos pedidos" />
      </AppInputContainer>

      <OrderList />
      <FloatButton icon="add" label="Novo Pedido" action={() => console.log("clicou no floatButton")} />

    </View>

  );
}
