import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text, View } from "react-native";
import { getFormattedCurrency } from "@/utils/format-values";
import { useState } from "react";
import { Item } from "@/model/item";



type Props = PressableProps & {
    data: Item;
    value: number;
    onChangeQuantity: (quantity: number) => void;
}

export function OrderListItem({ data, value, onChangeQuantity, ...rest }: Props) {

    const [quantity, setQuantity] = useState(value);

    function quantityUpdate(qty: number) {
        let value = (qty) > 0 ? qty : 0;
        setQuantity(value);
        onChangeQuantity(value);

    }

    return (

        <View className="w-full flex-row gap-2 ">

            <View className="flex-1 border bg-gray-800 border-orange-500 rounded-md h-24 mb-4">
                <View className="flex-row p-2 items-center gap-1">

                    <Text className="text-lg font-subtitle text-gray-400 flex-1">
                        #{data.id} - {data.name}
                    </Text>
                    <Text className="text-lg font-subtitle text-gray-400 flex-1">
                        {getFormattedCurrency(data.price)}
                    </Text>
                </View>

                {/* absolute bottom-16 flex flex-row right-0 z-[99] gap-8 */}
                <View className="flex-row items-center absolute z-50 -bottom-0 right-2 gap-8 ">

                    <Pressable className="bg-red-500 p-3 rounded-full"
                        onPress={() => quantityUpdate(quantity - 1)}>
                        <Ionicons name="remove-outline" size={16} color="#FFF" />
                    </Pressable>

                    <Text className="text-gray-400 text-lg font-bold">{quantity}</Text>

                    <Pressable className="bg-green-500 p-3 rounded-full" onPress={() => { quantityUpdate(quantity + 1) }}>
                        <Ionicons name="add" size={16} color="#FFF" />
                    </Pressable>



                </View>

            </View>

        </View>

    )
}
