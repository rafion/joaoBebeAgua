import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image, ScrollView, View } from "react-native";
import { DrawerButton } from "@/components";
import { CustomOptions } from "../../types/navigation";

export function DrawerContent(drawerProps: DrawerContentComponentProps) {
    return (
        <View className="flex-1 bg-gray-600 overflow-hidden">
            <View className="mt-10 w-full border-b pb-6 border-gray-500">
                <Image source={require("@/assets/logo.png")} className="w-10 h-10 rounded-lg ml-5" resizeMode="contain" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 42 }}>
                <View className="mt-2">
                    {drawerProps.state.routes.map((route, index) => {
                        const isFocused = drawerProps.state.index === index;
                        const options = drawerProps.descriptors[route.key].options as CustomOptions

                        if (options.title === undefined) {
                            return
                        }

                        const onPress = () => {
                            const event = drawerProps.navigation.emit({
                                type: "drawerItemPress",
                                canPreventDefault: true,
                                target: route.key
                            })

                            if (!isFocused && !event.defaultPrevented) {
                                drawerProps.navigation.navigate(route.name, route.params)
                            }
                        }



                        return (
                            <View key={route.key}>
                                <DrawerButton
                                    title={options.title}
                                    isFocused={isFocused}
                                    iconName={options.iconName}
                                    isDivider={options.isDivider}
                                    notifications={options.notifications}
                                    onPress={onPress} />
                            </View>
                        )

                    })}
                </View>
            </ScrollView>

        </View>


    )
}