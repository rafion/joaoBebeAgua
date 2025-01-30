import { OrderStatus } from "@/model/order";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
    filter: OrderStatus;
    setFilter: (status: OrderStatus) => void;
}
export default function Actions({ filter, setFilter }: Props) {

    const [status, setStatus] = useState(filter);

    function handleAction(status: OrderStatus) {
        setStatus(status);
        setFilter(status);
    }

    return (
        <View className="flex-row items-center mt-2 justify-center gap-4">

            <Pressable className={`${status === OrderStatus.CONFIRMED ? 'bg-orange-500' : ''} p-4 rounded-md`}
                onPress={() => handleAction(OrderStatus.CONFIRMED)}>
                <Text className="text-white">ABERTOS</Text>
            </Pressable>

            <Pressable className={`${status === OrderStatus.CONCLUDED ? 'bg-orange-500' : ''} p-4 rounded-md`}
                onPress={() => handleAction(OrderStatus.CONCLUDED)}>
                <Text className="text-white">FINALIZADOS</Text>
            </Pressable>

        </View>
    )
}