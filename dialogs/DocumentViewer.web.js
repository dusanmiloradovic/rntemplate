import React from "react";
import MaxList from "../components/Mlist";
import { View, Image, Text, Linking, Platform } from "react-native";
import { RelContainer, getDownloadURL, getLocalValue } from "mplus-react";
import { closeDialog } from "../utils/utils";
import { SERVER_ROOT } from "react-native-dotenv";
import { getDialogProps } from "../navigation/NavigationService";
import { WebView } from "react-native-web-webview";
import { Button, ListItem, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useSetOptions } from "../hooks";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

export default props => {
  useSetOptions({
    headerTitle: "Documents",
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
  return <WebView source={{ uri: "https://maximoplus.com" }} />;
};
