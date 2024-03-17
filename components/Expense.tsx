import { StyleSheet, Text, View } from "react-native";

import React, { useEffect } from "react";

const Expense = ({ item }) => {
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
