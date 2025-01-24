import { ReactNode } from "react";
import { TextInput, TextInputProps, TouchableOpacity, TouchableOpacityProps, View, } from "react-native";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";


type InputProps = {
    children: ReactNode
}

function AppInputContainer({ children }: InputProps) {
    return (
        <View className="w-full h-14 bg-gray-800 rounded-lg px-4 flex-row items-center gap-4">
            {children}
        </View>
    )
}

function InputField({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className="flex-1 font-normal text-base text-white"
            placeholderTextColor={colors.gray[400]}
            cursorColor={colors.blue[600]}
            {...rest}
        />
    )
}

function InputClearButton(props: TouchableOpacityProps) {
    return (
        <TouchableOpacity activeOpacity={0.7} {...props}>
            <Feather name="x" size={24} color="#999" />
        </TouchableOpacity>
    )
}

AppInputContainer.InputField = InputField

export { AppInputContainer }

// export const AppInput = {
//     Container: InputContainer,
//     Field: InputField,
//     ClearButton: InputClearButton,
// }