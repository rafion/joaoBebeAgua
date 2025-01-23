import { View, Pressable, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export function Header() {
    return (
        <View className='w-full flex-1 flex-row bg-teal-600 items-center justify-between'>

            {/* <Pressable className='w-10 h-10 bg-white rounded-full flex justify-center items-center' >
                <Ionicons name='menu' size={20} color={"#121212"} />
            </Pressable> */}

            <View className='flex flex-col items-center justify-center'>
                <View className='flex-row items-center justify-center gap-1'>
                    <Feather name='home' size={14} color={"#FF000"} />
                    <Text className='text-lg font-bold'>Home</Text>
                </View>
            </View>

        </View>
    );
}