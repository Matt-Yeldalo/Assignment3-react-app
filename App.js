import React, { useState, useRef } from "react";
import AppLoading from "expo-app-loading";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
// Components
import Output from "./components/Output";
import ProductPicker from "./components/ProductPicker";
// Import fonts
import * as Font from "expo-font";
export default function App() {
  // State checks if fonts are loaded
  const [fontsReady, setFontsReady] = useState(false);
  // Load custom fonts
  const fontLoad = () => {
    return Font.loadAsync({
      "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
      "FiraSans-Regular": require("./assets/fonts/FiraSans-Regular.ttf"),
      "Cairo-Bold": require("./assets/fonts/Cairo-Bold.ttf"),
    });
  };
  // Load images
  const backgroundImage = require("./assets/food-background.jpg");
  const headingImage = require("./assets/burger.jpg");
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
  // If fonts aren't ready
  if (!fontsReady) {
    return (
      <AppLoading
        startAsync={fontLoad}
        onFinish={() => setFontsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <SafeAreaView style={styles.mainStyle}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Text style={styles.heading}>Sydney Food Festival</Text>
        <View style={styles.viewContainer}>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.contentContainer}>
              <Image style={styles.headingImage} source={headingImage} />
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
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    fontFamily: "FiraSans-Regular",
  },
  scrollViewContainer: {
    flex: 1,
  },
  contentContainer: {
    height: "auto",
    flex: 1,
    paddingBottom: 200,
  },
  viewContainer: {
    flex: 1,
    overflow: "hidden",
    width: "82%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headingImage: {
    width: "100%",
    height: "30%",
    opacity: 0.8,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Lobster-Regular",
    padding: 20,
    textAlign: "center",
    fontSize: 40,
  },
});
