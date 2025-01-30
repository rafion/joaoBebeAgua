import { Order } from "@/model/order";
import { styles } from "@/styles/styles";
import { getFormattedCurrency } from "@/utils/format-values";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View, StyleSheet } from "react-native";


const timeformat: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false
} as const;

interface Props {
    order: Order;
    onConfirm: () => void;
    onCancel: () => void;
}

export function OrderCard({ order, onConfirm, onCancel }: Props) {


    function printDate(date: Date) {
        return new Date(date).toLocaleTimeString('pt-BR', timeformat);
    }

    return (
        <View className="w-full flex-row gap-4 rounded-md">

            <View className="flex-1">
                <View className="flex-row items-center gap-1">

                    <Text className="text-lg font-subtitle text-gray-400 flex-1">
                        {order.customerName}
                    </Text>
                    {/* 12 de fev. as 13:36h */}
                    <Text className="text-sm font-body text-gray-400" numberOfLines={1} lineBreakMode="tail">
                        {printDate(order.deliveryDate || new Date())}

                    </Text>

                </View>

                <Text className="text-base font-body text-gray-400">
                    Endereço: {(order.streetName || "") + ", " + (order.streetNumber || "")}
                </Text>
                {/* <Text className="text-base font-body text-gray-400" numberOfLines={1} lineBreakMode="tail">
                    Produtos: {order.items.map(item => (item.itemName) + ' R$ ' + (item.unitPrice) + ' x ' + (item.quantity)).join(', ')}
                </Text> */}


                <Text className="text-lg font-subtitle text-gray-400">Total: {getFormattedCurrency(order.orderAmount)}</Text>

                {/* absolute bottom-16 flex flex-row right-0 z-[99] gap-8 */}
                <View style={styles.buttons}>
                    <Pressable style={styles.buttonDelete} onPress={onCancel}>
                        <Ionicons name="trash-outline" size={16} color="#FFF" />
                    </Pressable>


                    <Pressable style={styles.buttonComplete} onPress={onConfirm}>
                        <Ionicons name="checkmark-outline" size={16} color="#FFF" />
                    </Pressable>

                </View>
            </View>
        </View>

    )
}
