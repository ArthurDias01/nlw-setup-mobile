import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ?
        <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
          <Feather name="check" color={colors.white} size={20} />
        </View>
        :
        <View className="h-8 w-8 bg-zinc-800 rounded-lg items-center justify-center" />
      }
      <Text className="text-white text-semibold ml-3">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
