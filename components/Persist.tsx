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
import { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { Children, useEffect, useState } from "react";

const supabase = createClient(
  "https://eobxdouujllrgcyobxrz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYnhkb3V1amxscmdjeW9ieHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNDQwNDUsImV4cCI6MjAyNTkyMDA0NX0.K98vqk3lqZI_TrEgn0xBgrtNdml1GuaumIkHHurp6Cc"
);

configureObservablePersistence({
  // Use AsyncStorage in React Native
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
});

const state = observable({
  expenses: [
    {
      id: 4,
      title: "Phone",
      amount: 50.0,
    },
    {
      id: 6,
      title: "Laptop",
      amount: 75.0,
    },
  ],
});

persistObservable(state, {
  local: "store",
  pluginRemote: {
    get: ({ onChange }) => {
      const getFn = async () => {
        const { data, error } = await supabase.from("notes").select();
        if (error) {
          throw error; // Handle the error appropriately
        }
        // Assuming 'data' is an array of expenses, transform it to match the expected structure
        return { expenses: data };
      };

      setInterval(async () => {
        const value = getFn();
        onChange({ value });
      }, 10000);

      return getFn();
    },
    set: async ({ value, changes }) => {
      const lastObject = value.expenses[value.expenses.length - 1];
      console.log("value:");
      console.log(value.expenses);
      await supabase.from("notes").upsert(value.expenses);
      // .insert({
      //   title: lastObject.title,
      //   amount: lastObject.amount,
      // });
    },
  },
  remote: {
    onSet: () => console.log("saved hi"),
    onSetError: (err) => console.log(err),
  },
});

const App = observer(({ session }: { session: Session }) => {
  const expenses = state.expenses.get();
  console.log("expenses:");
  console.log(expenses);

  const addExpense = () => {
    const newExpense = {
      id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      title: "home",
      amount: Math.floor(Math.random() * 100),
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
