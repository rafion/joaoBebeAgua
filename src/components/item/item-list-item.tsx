import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text, TouchableOpacity, View } from "react-native";

import { Item } from "@/model/item";
import { getFormattedCurrency } from "@/utils/format-values";
import { styles } from "@/styles/styles";
import { useState } from "react";

type Props = PressableProps & {
    data: Item;
    selectionMode: boolean;
    onSelect: () => void
    onDelete: () => void
    onEdit: () => void
}

export function ItemListItem({ data, selectionMode, onSelect, onDelete, onEdit, ...rest }: Props) {

    const [selected, setSelected] = useState(false);

    return (
        <TouchableOpacity

            style={{ backgroundColor: selected ? "red" : "transparent" }}
            onPress={onSelect}>
            <View className="w-full flex-row gap-4 rounded-md bg-gray-800">

                <View className="flex-1">
                    <View className="flex-row items-center gap-1">

                        <Text className="text-lg font-subtitle text-gray-400 flex-1">
                            #{data.id} - {data.name}
                        </Text>
                        <Text className="text-lg font-subtitle text-gray-400 flex-1">
                            {getFormattedCurrency(data.price)}
                        </Text>
                    </View>

                    {/* absolute bottom-16 flex flex-row right-0 z-[99] gap-8 */}
                    <View style={styles.buttons}>
                        <Pressable style={styles.buttonDelete} onPress={onDelete}>
                            <Ionicons name="trash-outline" size={16} color="#FFF" />
                        </Pressable>

                        <Pressable style={styles.buttonEdit}
                            onPress={onEdit}>
                            <Ionicons name="create-outline" size={16} color="#FFF" />
                        </Pressable>

                    </View>

                </View>

            </View>
        </TouchableOpacity>
    )
}
