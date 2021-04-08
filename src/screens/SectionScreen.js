import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default () => (
  <View style={styles.container}>
    <Text stye={styles.paragraph}>Section</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
