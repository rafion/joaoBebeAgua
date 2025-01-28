import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
    filter: boolean;
    setFilter: (status: boolean) => void;
}
export default function Actions({ filter, setFilter }: Props) {

    const [status, setStatus] = useState(filter);

    function handleAction(item: boolean) {
        setStatus(item);
        setFilter(item);
    }

    return (
        <View className="flex-row items-center mt-2 justify-center gap-4">

            <Pressable className={`${status ? 'bg-orange-500' : ''} p-4 rounded-md`}
                onPress={() => handleAction(true)}>
                <Text className="text-white">ABERTOS</Text>
            </Pressable>

            <Pressable className={`${!status ? 'bg-orange-500' : ''} p-4 rounded-md`}
                onPress={() => handleAction(false)}>
                <Text className="text-white">FINALIZADOS</Text>
            </Pressable>

        </View>
    )
}