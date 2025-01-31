import { Order, OrderStatus } from "@/model/order";
import { OrderItem } from "@/model/orderItem";
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
    onConclude: () => void;
    onCancel: () => void;
    onDelete: () => void;
}

export function OrderCard({ order, onConclude, onCancel, onDelete }: Props) {


    function printDate(date: Date) {
        return new Date(date).toLocaleTimeString('pt-BR', timeformat);
    }

    function printOrderItens(order: Order) {

        if (order.items && order.items.length > 0) {
            return "Itens: " + order.items.map(
                (item) => (item.itemName) + ' R$ ' + (item.unitPrice) + ' x ' + (item.quantity)).join('; ');
        } else
            return "";

    }

    function isConfirmed() {
        return order.status == OrderStatus.CONFIRMED
    }

    function isConcluded() {
        return order.status == OrderStatus.CONCLUDED
    }
    function isCanceled() {
        return order.status == OrderStatus.CANCELLED
    }

    return (
        <View className="w-full bg-gray-800 flex-row gap-4 rounded-md">

            <View className="flex-1">
                <View className="flex-row items-center gap-1">

                    <Text className="text-lg font-subtitle text-gray-400 flex-1">
                        #: {order.id}
                    </Text>
                    {/* 12 de fev. as 13:36h */}
                    <Text className="text-lg font-subtitle text-gray-400" numberOfLines={1} lineBreakMode="tail">
                        {printDate(order.deliveryDate || new Date())}

                    </Text>

                </View>
                <Text className="text-lg font-subtitle text-gray-400 flex-1">
                    {order.customerName}
                </Text>

                <Text className="text-lg font-subtitle text-gray-400">
                    Endereço: {(order.streetName || "") + ", " + (order.streetNumber || "")}
                </Text>
                {/* {order.items && (
                    <Text className="text-base font-body text-gray-400" numberOfLines={3} lineBreakMode="tail">
                        {printOrderItens(order)}
                    </Text>)
                } */}
                <View>
                    {order.items.map((item, index) => (
                        <Text key={index} className="ml-4 text-lg font-subtitle text-gray-400">
                            x {item.quantity}, {item.itemName}, R$ {item.unitPrice}, Total: {item.price}
                        </Text>
                    ))}
                </View>



                <Text className="text-2xl font-subtitle text-gray-400">
                    Total: {getFormattedCurrency(order.orderAmount)}
                </Text>

                {/* absolute bottom-16 flex flex-row right-0 z-[99] gap-8 */}
                <View className="flex-row items-center absolute z-50 -bottom-3 right-2 gap-6">
                    {!isCanceled() && (
                        <Pressable className="bg-red-500 p-3 rounded-full" onPress={onCancel}>
                            <Ionicons name="trash-outline" size={16} color="#FFF" />
                        </Pressable>
                    )}


                    {!isConcluded() && !isCanceled() && (
                        <Pressable className="bg-green-500 p-3 rounded-full" onPress={onConclude}>
                            <Ionicons name="checkmark-outline" size={16} color="#FFF" />
                        </Pressable>
                    )}

                    {isCanceled() && (
                        <Pressable className="bg-red-500 p-3 rounded-full" onPress={onDelete}>
                            <Ionicons name="close-circle-outline" size={16} color="#FFF" />
                        </Pressable>
                    )}


                </View>
            </View>
        </View>

    )
}
