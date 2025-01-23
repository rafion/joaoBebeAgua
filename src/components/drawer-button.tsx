import { Text, Pressable, PressableProps, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"


export type IconNameType = keyof typeof MaterialIcons.glyphMap

interface TabBarButtonProps extends PressableProps {
    title?: string
    isFocused?: boolean
    isDivider?: boolean
    iconName: IconNameType
    notifications?: number
}

export function DrawerButton({
    title = "",
    iconName,
    isDivider = false,
    isFocused = true,
    notifications,
    ...rest
}: TabBarButtonProps) {
    return (
        <Pressable
            className={` ${isDivider ? ' border-b  border-gray-500 ' : 'ml-2 py-2 w-full'}`}
            {...rest}
        >
            <View
                className={`flex-row items-center gap-4 w-full h-14 px-6 -ml-2
                     (${isFocused} ? 'bg-orange-800 rounded-r-full' : '')
                     (${isDivider} ? '-ml-14' : '')`
                }
            >
                <MaterialIcons
                    name={iconName}
                    size={20}
                    color={isFocused ? colors.orange[300] : colors.gray[400]}
                />
                <Text
                    className={`font-subtitle text-base flex-1 ${isFocused ? 'text-orange-300' : 'text-white'}`}>
                    {title}
                </Text>

                <Text
                    className={` text-sm font-body ${isFocused ? 'text-orange-300' : 'text-gray-400'}`}>
                    {notifications}
                </Text>
            </View>
        </Pressable>
    )
}