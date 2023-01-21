import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORINZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORINZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {

}

export function HabitDay({ ...rest }: Props) {

  return (
    <TouchableOpacity
      {...rest}
      className="rounded-lg bg-zinc-900 border-2 border-zinc-800 m-1"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    />
  )
}
