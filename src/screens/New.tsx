import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";
import { api } from "../lib/axios";
import { useNavigation } from "@react-navigation/native";

const allWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

export function New() {
  const { navigate } = useNavigation();
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [newHabitTitle, setNewHabitTitle] = useState<string>('');

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(weekDays.filter(day => day !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  };

  async function handleCreateNewHabit() {
    try {
      if (!newHabitTitle || newHabitTitle.trim() === '') {
        return Alert.alert('Ops', 'Informe o título do hábito.');
      }

      if (weekDays.length === 0) {
        return Alert.alert('Ops', 'Informe a recorrência do hábito.');
      }

      const newHabit = {
        title: newHabitTitle,
        weekDays,
      }
      // console.log(newHabit);

      await api.post('/habits', newHabit);
      setWeekDays([])
      setNewHabitTitle('')
      Alert.alert('Novo Hábito', 'Hábito criado com sucesso.', [{
        text: 'OK',
        onPress: () => navigate('home')
      }]);
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o hábito.');
    }



  };


  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white
          border-2 border-zinc-800
          focus:border-2 focus:border-green-600"
          placeholder="Ex: Ler 1 capítulo de um livro por dia, beber água"
          placeholderTextColor={colors.gray[400]}
          onChangeText={setNewHabitTitle}
          value={newHabitTitle}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {
          allWeekDays.map((weekday, index) => (
            <Checkbox
              key={`${weekday}-${index}`}
              title={weekday}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex flex-row items-center justify-center bg-green-600
          rounded-md mt-6"
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-white text-base ml-2">Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
