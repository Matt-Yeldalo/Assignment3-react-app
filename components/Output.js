import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

export default function Output(props) {
  // State used to control modal
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.output}>
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={styles.modalText}
              >{`Total Cost of Order: $${props.totalCost}`}</Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            props.calculateTotal();
            setModalVisible(!modalVisible);
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Calculate Total
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#e74853",
    padding: 12,
    borderRadius: 20,
    elevation: 2,
  },
  outputText: {
    fontSize: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
