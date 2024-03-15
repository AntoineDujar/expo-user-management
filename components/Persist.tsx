import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";
import { Button, StyleSheet, View, FlatList } from "react-native";
import Expense from "./Expense";

configureObservablePersistence({
  // Use AsyncStorage in React Native
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      // The AsyncStorage plugin needs to be given the implementation of AsyncStorage
      AsyncStorage,
    },
  },
});

const state = observable({
  expenses: [
    {
      id: "1",
      title: "Groceries",
      amount: 50.0,
      color: "rgb(100, 100, 200)",
      date: new Date().toLocaleString(),
    },
    {
      id: "2",
      title: "Electric Bill",
      amount: 75.0,
      color: "rgb(100, 100, 200)",
      date: new Date().toLocaleString(),
    },
  ],
});

persistObservable(state, {
  local: "store", // Unique name
});

const App = observer(() => {
  const expenses = state.expenses.get();

  const addExpense = () => {
    const newExpense = {
      id: Math.random().toString(),
      title: "home",
      amount: Math.floor(Math.random() * 100),
      color: "rgb(100, 100, 50)",
      date: new Date().toLocaleString(),
    };
    state.expenses.set((currentExpenses) => [...currentExpenses, newExpense]);
  };

  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Expense item={item} />}
      />
      <Button title="Add Expense" onPress={addExpense} />
    </View>
  );
});

export default App;
