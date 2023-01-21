import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export function BackButton() {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goBack}
      className="flex-row items-center"
    >
      <Feather name="arrow-left" color={colors.zinc[400]} size={32} />
    </TouchableOpacity>
  );
}
