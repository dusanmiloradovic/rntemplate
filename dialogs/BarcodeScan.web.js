import React, { PureComponent } from "react";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { closeDialog } from "../utils/utils";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useSetOptions } from "../hooks";

export default props => {
  const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
  const iconName = platformPrefix + "-arrow-back";
  useSetOptions({
    headerTitle: "Barcode Scan",
    headerLeft: () => (
      <Button
        color="#fff"
        onPress={closeDialog}
        type="clear"
        style={{ marginRight: "5px" }}
        icon={<Ionicons style={{ padding: "3px" }} name={iconName} size={24} />}
      />
    )
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Barcode scanning not supported on web</Text>
    </View>
  );
};
