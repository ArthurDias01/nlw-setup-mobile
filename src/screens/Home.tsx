import { View, Text, ScrollView } from "react-native";
import { generateDatesFromYearBeginning } from '../utils/generate-date-from-year-beginning';
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysTofill = minimumSummaryDatesSize - datesFromYearBeginning.length;

export function Home() {

  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekday, index) => (
          <Text key={`${weekday}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekday}
          </Text>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="flex-row flex-wrap">
          {
            datesFromYearBeginning.map(date => (
              <HabitDay key={date.toISOString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            ))
          }
          {
            amountOfDaysTofill > 0 && Array
              .from({ length: amountOfDaysTofill })
              .map((_, index) => (
                <View
                  key={`fill-${index}`}
                  className="rounded-lg bg-zinc-900 border-2 border-zinc-800 m-1 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))

          }
        </View>
      </ScrollView>
      {/* <HabitDay /> */}
    </View>
  )
}
