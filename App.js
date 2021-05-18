import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

export default function App() {
  const image = require("./img/food-background.jpg");
  // Get the food and drink data, assign to variables
  const data = require("./data.json");
  const foods = data.food;
  const drinks = data.drink;
  // Make the quantity array, this contains the number of items a user can select at one time
  const qtyMax = 5;
  const qtyArray = [...Array(qtyMax)].map((_, i) => i + 1);
  // Handles state of the total cost
  const [totalCost, setTotalCost] = useState("");
  // This handles state for the dropdown boxes, set default values
  const [selectedFoodItem, setFoodItemValue] = useState(foods[0].price);
  const [selectedFoodQty, setFoodQtyValue] = useState(qtyArray[0]);
  const [selectedDrinkItem, setDrinkItemValue] = useState(drinks[0].price);
  const [selectedDrinkQty, setDrinkQtyValue] = useState(qtyArray[0]);
  // Function that calculates the total cost
  function calculateTotal() {
    let foodTotal = selectedFoodItem * selectedFoodQty;
    let drinkTotal = selectedDrinkItem * selectedDrinkQty;
    setTotalCost(foodTotal + drinkTotal);
  }
  return (
    <SafeAreaView style={styles.mainStyle}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <Text style={styles.heading}>Sydney Food Festival</Text>
        <View style={styles.container}>
          <View style={styles.product}>
            <Text style={styles.productHeading}>Food</Text>
            <View style={styles.productInput}>
              <Picker
                selectedValue={selectedFoodItem}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setFoodItemValue(itemValue)
                }
              >
                {foods.map((food, index) => (
                  <Picker.Item
                    key={index}
                    label={`${food.item}-$${food.price}`}
                    value={food.price}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedFoodQty}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setFoodQtyValue(itemValue)
                }
              >
                {qtyArray.map((qty) => (
                  <Picker.Item key={qty} label={qty} value={qty} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.product}>
            <Text style={styles.productHeading}>Drink</Text>
            <View style={styles.productInput}>
              <Picker
                selectedValue={selectedDrinkItem}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setDrinkItemValue(itemValue)
                }
              >
                {drinks.map((drink, index) => (
                  <Picker.Item
                    key={index}
                    label={`${drink.item}-$${drink.price}`}
                    value={drink.price}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedDrinkQty}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setDrinkQtyValue(itemValue)
                }
              >
                {qtyArray.map((qty) => (
                  <Picker.Item key={qty} label={qty} value={qty} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.output}>
            <Button
              color='#e74853'
              onPress={calculateTotal}
              title='Calculate Total'
            />
            <Text>
              {totalCost == "" ? "" : `Total cost of the order: $${totalCost}`}
            </Text>
          </View>
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
  product: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
  productHeading: {
    fontFamily: ["cairo", "sansserif"],
  },
  productInput: {
    display: "flex",
    flexDirection: "row",
  },
  pickerStyle: {
    fontFamily: "inherit",
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
  output: {
    marginTop: "20px",
  },
});
