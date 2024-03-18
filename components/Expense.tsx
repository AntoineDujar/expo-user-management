import { StyleSheet, Text, View } from "react-native";

import React, { useEffect } from "react";

interface ExpenseItem {
  title: string;
  amount: number;
}

const Expense = ({ item }: { item: ExpenseItem }) => {
  return (
    <>
      <View />
      <View>
        <Text>{item.title}</Text>
      </View>
      <Text>${item.amount.toFixed(2)}</Text>
    </>
  );
};

export default Expense;
