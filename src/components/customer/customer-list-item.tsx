import { Customer } from "@/model/customer";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { PressableProps } from "react-native-gesture-handler";

type Props = PressableProps & {
    data: Customer;
    onDelete: () => void
    onEdit: () => void
}

export function CustomerListItem({ data, onDelete, onEdit, ...rest }: Props) {

    function printAddress() {
        return ((data.streetName != "") ? data.streetName : "")
            + ((data.streetNumber != "") ? (", : " + data.streetNumber) : "")
            + ((data.complement != "") ? (", " + data.complement) : "")
            + ((data.reference != "") ? (", ref.: " + data.reference) : "");

    }
    return (
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


                {/* absolute bottom-16 flex flex-row right-0 z-[99] gap-8 */}
                <View style={styles.buttons}>
                    <Pressable style={styles.buttonDelete} onPress={onDelete}>
                        <Ionicons name="trash-outline" size={16} color="#FFF" />
                    </Pressable>

                    <Pressable style={styles.buttonComplete}
                        onPress={onEdit}>
                        <Ionicons name="create-outline" size={16} color="#FFF" />
                    </Pressable>

                </View>

            </View>




        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#64748b",
        marginBottom: 30,
        padding: 14,
        borderRadius: 4,
    },
    text: {
        fontWeight: "500",
        color: "#FFF"
    },
    buttons: {
        position: "absolute",
        bottom: -10,
        flexDirection: "row",
        right: 0,
        zIndex: 99,
        gap: 8,
    },
    buttonDelete: {
        backgroundColor: "#ef4444",
        padding: 6,
        borderRadius: 99,
    },
    buttonComplete: {
        backgroundColor: "#22c55e",
        padding: 6,
        borderRadius: 99,
    }
})