import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import Output from "./components/Output";
import ProductPicker from "./components/ProductPicker";

export default function App() {
  const image = require("./img/food-background.jpg");
  // Get the food and drink data, assign to variables
  const data = require("./data.json");
  const foods = data.food;
  const drinks = data.drink;
  // Make the quantity array, this contains the number of items a user can select at one time
  const qtyMax = 5;
  const qtyArray = [...Array(qtyMax)].map((_, i) => i + 1);
  // Handles state containing total of items
  const [foodTotal, setFoodTotal] = useState(0);
  const [drinkTotal, setDrinkTotal] = useState(0);
  // List of pickers, each picker has reference to the state which contains the total cost
  const pickers = [
    {
      title: "Food",
      data: foods,
      updateTotal: setFoodTotal,
      updateTotalEvent: useRef(),
    },
    {
      title: "Drinks",
      data: drinks,
      updateTotal: setDrinkTotal,
      updateTotalEvent: useRef(),
    },
  ];

  // Function that calculates the total cost
  function calculateTotal() {
    // Call the update event on each picker
    for (let picker of pickers) {
      picker.updateTotalEvent.current.updateTotal();
    }
  }
  return (
    <SafeAreaView style={styles.mainStyle}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <Text style={styles.heading}>Sydney Food Festival</Text>
        <View style={styles.container}>
          {pickers.map((item, index) => (
            <ProductPicker
              key={index}
              title={item.title}
              data={item.data}
              qtyArray={qtyArray}
              updateTotalCallback={item.updateTotal}
              ref={item.updateTotalEvent}
            />
          ))}

          <Output
            calculateTotal={calculateTotal}
            totalCost={foodTotal + drinkTotal}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    fontfamily: ["firasans", "sansserif"],
  },
  container: {
    display: "flex",
    width: "80%",
    margin: "auto",
    alignItems: "center",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontFamily: "Lobster",
    padding: "10px",
    textAlign: "center",
    fontSize: "3em",
  },
});
