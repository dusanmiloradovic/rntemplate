import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { closeDialog } from "../utils/utils";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSetOptions } from "../hooks";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default props => {
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
  const iconName = platformPrefix + "-arrow-back";
  useSetOptions({
    headerTitle: "Barcode Scan",
    headerTransparent: true,
    headerLeft: () => (
      <Button
        color="#fff"
        onPress={closeDialog}
        type="clear"
        style={{ marginRight: 5 }}
        icon={<Ionicons style={{ padding: 3 }} name={iconName} size={24} />}
      />
    ),
    headerStyle: { borderBottomWidth: 0 }
  });

  const handleBarCodeScanned = ({ type, data }) => {
    const { onScan } = props.route.params["dialog"];
    if (onScan && typeof onScan === "function") {
      onScan(data);
    }
    closeDialog();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
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
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};
