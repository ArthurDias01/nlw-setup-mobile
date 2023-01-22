import { View, Text, ScrollView, Alert } from "react-native";
import { generateDatesFromYearBeginning } from '../utils/generate-date-from-year-beginning';
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../lib/axios";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { Loading } from "../components/Loading";



const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysTofill = minimumSummaryDatesSize - datesFromYearBeginning.length;

type ISummary = {
  date: Date;
  id: string;
  completed: number;
  amount: number;
}[];


export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<ISummary>([]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/summary');
      // console.log(response.data)
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o summário de hábitos.');
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if (loading) {
    return <Loading />
  }

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
        {summary !== undefined && summary.length !== 0 &&
          <View className="flex-row flex-wrap">
            {
              datesFromYearBeginning.map(date => {
                const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'));

                return (
                  <HabitDay key={date.toISOString()}
                    onPress={() => navigate('habit', { date: date.toISOString() })}
                    date={date}
                    amountCompleted={dayInSummary?.completed}
                    amountOfHabits={dayInSummary?.amount}
                  />
                )
              })
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
        }
      </ScrollView>

    </View>
  )
}
