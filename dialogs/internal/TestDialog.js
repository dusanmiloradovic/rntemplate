import React from "react";
import { Button } from "react-native-elements";
import { openDialog, closeDialog } from "../utils/utils";
import { useSetOptions } from "../hooks";
import { View, Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default props => {
  useSetOptions({
    headerTitle: "Test Dialog",
    headerLeft: () => (
      <Button
        color="#fff"
        onPress={closeDialog}
        type="clear"
        style={{ marginRight: 5 }}
        icon={
          <Ionicons
            style={{ padding: 3 }}
            name={platformPrefix + "-arrow-back"}
            size={24}
          />
        }
      />
    )
  });
  return (
    <View>
      <Text>{uuidv4()}</Text>
      <Button
        title="Open one more"
        onPress={ev => openDialog({ type: "testDialog" })}
      />
    </View>
  );
};
