import React, { PureComponent } from "react";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { closeDialog } from "../utils/utils";
import { Text, View, StyleSheet } from "react-native";

export default class extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const backButton = (
      <HeaderActionButtons
        buttons={[{ key: "close", label: "Back", action: closeDialog }]}
        icons={{ close: "md-arrow-back" }}
      />
    );
    return {
      headerTitle: <Text style={{ fontSize: 18 }}>Scan Barcode</Text>,
      headerLeft: backButton,
      headerStyle: { borderBottomWidth: 0 }
    };
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <Text>Barcode scanning not supported on web</Text>
      </View>
    );
  }
}
