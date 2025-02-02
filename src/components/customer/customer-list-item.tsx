import { Customer } from "@/model/customer";
import { styles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View, PressableProps, TouchableOpacity } from "react-native";


type Props = PressableProps & {
    data: Customer;
    selectionMode: boolean;
    onSelect: () => void
    onDelete: () => void
    onEdit: () => void
}

export function CustomerListItem({ data, selectionMode, onSelect, onDelete, onEdit, ...rest }: Props) {

    const [selected, setSelected] = useState(false);

    function printAddress() {
        return ((data.streetName != "") ? data.streetName : "")
            + ((data.streetNumber != "") ? (", " + data.streetNumber) : "")
            + ((data.complement != "") ? (", " + data.complement) : "")
            + ((data.reference != "") ? (", ref.: " + data.reference) : "");

    }

    return (
        <TouchableOpacity

            style={{ backgroundColor: selected ? "#5E4D4E" : "transparent" }}
            onFocus={() => setSelected(true)}
            onPress={onSelect}>
            <View className="w-full flex-row gap-4 rounded-md bg-gray-800">

                <View className="flex-1">
                    <View className="flex-row items-center gap-1">

                        <Text className="text-lg font-subtitle text-gray-400 flex-1">
                            #{data.id} - {data.name}
                        </Text>
                    </View>
                    {data.streetName &&
                        <Text className="text-base font-body text-gray-400">
                            Endereço: {printAddress()}
                        </Text>}


                    {data.city &&
                        <Text className="text-base font-body text-gray-400">Cidade: {data.city}</Text>
                    }


                    {!selectionMode &&
                        <View style={styles.buttons}>
                            <Pressable style={styles.buttonDelete} onPress={onDelete}>
                                <Ionicons name="trash-outline" size={16} color="#FFF" />
                            </Pressable>

                            <Pressable style={styles.buttonEdit}
                                onPress={onEdit}>
                                <Ionicons name="create-outline" size={16} color="#FFF" />
                            </Pressable>

                        </View>
                    }

                </View>

            </View>
        </TouchableOpacity>

    )
}