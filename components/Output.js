import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Output(props) {
  return (
    <View style={styles.output}>
      <Button
        color='#e74853'
        onPress={props.calculateTotal}
        title='Calculate Total'
      />
      <Text>
        {props.totalCost == ""
          ? ""
          : `Total cost of the order: $${props.totalCost}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    marginTop: "20px",
  },
});
