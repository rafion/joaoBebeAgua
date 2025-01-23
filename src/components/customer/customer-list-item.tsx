import { Customer } from "@/model/customer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";


export function CustomerListItem({ customer }: { customer: Customer }) {

    async function handleDeleteCustomer() {
        console.log("clicou no delete, id: " + customer.id);
    }

    async function handleUpdateCustomer() {
        console.log("clicou no update, id: " + customer.id);
    }

    return (
        <View className="w-full flex-row gap-4 rounded-md">

            <View className="flex-1">
                <View className="flex-row items-center gap-1">

                    <Text className="text-lg font-subtitle text-gray-400 flex-1">
                        {customer.name}
                    </Text>
                </View>

                <Text className="text-base font-body text-gray-400">
                    Endereço: {(customer.streetName || "")
                        + ", " + (customer.streetNumber || "")
                        + ", " + (customer.district || "")
                        + ", " + (customer.complement || "")
                        + ", " + (customer.reference || "")
                        + ", " + (customer.city || "")
                    }
                </Text>

                {/* absolute bottom-16 flex flex-row right-0 z-[99] gap-8 */}
                <View style={styles.buttons}>
                    <Pressable style={styles.buttonDelete} onPress={handleDeleteCustomer}>
                        <Ionicons name="trash-outline" size={16} color="#FFF" />
                    </Pressable>

                    {/* <Link href={"/customers/customer-form"}></Link> */}
                    <Pressable style={styles.buttonComplete}
                        onPress={() => router.push({ pathname: '/customers/customer-form', params: { id: customer.id } })}>
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