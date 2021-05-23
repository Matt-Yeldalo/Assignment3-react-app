import React, { useState, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";

export default forwardRef((props, ref) => {
  // This handles state for the dropdown boxes, set default values
  const [selectedItem, setItem] = useState(0);
  const [selectedItemQty, setItemQtyValue] = useState(props.qtyArray[0]);
  // These functions are called every time a value is changed
  function onItemChange(itemIndex) {
    setItem(itemIndex);
  }
  function onQtyChange(itemValue) {
    setItemQtyValue(parseInt(itemValue));
  }
  // This is called when calculate total is pressed
  useImperativeHandle(ref, () => ({ updateTotal }));
  // Update the state based on the quantity and item price
  function updateTotal() {
    let item = props.data[selectedItem];
    console.log(item.price, selectedItemQty);
    props.updateTotalCallback(parseInt(item.price * selectedItemQty));
  }

  return (
    <View style={styles.product}>
      <Text style={styles.productHeading}>{props.title}</Text>
      <View style={styles.productInput}>
        <Picker
          selectedValue={selectedItem}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => onItemChange(itemIndex)}
        >
          {props.data.map((item, index) => (
            <Picker.Item
              key={index}
              label={`${item.item}-$${item.price}`}
              value={index}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedItemQty}
          style={styles.pickerStyle}
          onValueChange={(qtyValue, itemIndex) => onQtyChange(qtyValue)}
        >
          {props.qtyArray.map((qty) => (
            <Picker.Item key={qty} label={qty} value={qty} />
          ))}
        </Picker>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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
});
