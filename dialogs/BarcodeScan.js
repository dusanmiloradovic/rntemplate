import React, { PureComponent } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { closeDialog } from "../utils/utils";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class extends PureComponent {
  state = {
    hasCameraPermission: null
  };

  static navigationOptions = ({ navigation }) => {
    const backButton = (
      <HeaderActionButtons
        buttons={[{ key: "close", label: "Back", action: closeDialog }]}
        icons={{ close: "md-arrow-back" }}
        style={{ color: "white" }}
      />
    );
    return {
      headerTitle: (
        <Text style={{ color: "white", fontSize: 18 }}>Scan Barcode</Text>
      ),
      headerTransparent: true,
      headerLeft: backButton,
      headerStyle: { borderBottomWidth: 0 }
    };
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { onScan } = this.props.navigation.getParam("dialog");
    if (onScan && typeof onScan === "function") {
      onScan(data);
    }
    closeDialog();
  };
}
