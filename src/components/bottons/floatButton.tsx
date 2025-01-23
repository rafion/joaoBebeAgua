import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type FloatButtonProps = TouchableOpacityProps & {
    icon?: keyof typeof MaterialIcons.glyphMap;
    label: string;
    action: () => void;
}

export function FloatButton({ icon, label, action }: FloatButtonProps) {
    return (
        <TouchableOpacity onPress={action} className="px-4 py-3 bg-gray-600 rounded-full absolute bottom-4 right-4
            gap-1 flex-row items-center"
            activeOpacity={0.7}>

            {icon && (<MaterialIcons name={icon} size={22} color={colors.orange[500]} />)}

            <Text className="font-subtitle text-orange-500" >{label}</Text>
        </TouchableOpacity>
    )
}