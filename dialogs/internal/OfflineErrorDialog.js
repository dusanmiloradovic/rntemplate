import React, { Component } from "react";
import { FlatList, Platform } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { closeDialog } from "../../utils/utils";
import listTemplates from "../../components/listTemplates";
import { getDialogProps } from "../../navigation/NavigationService";
import { useSetOptions } from "../../hooks";

import {
  HeaderButtons,
  Item,
  HeaderButton
} from "react-navigation-header-buttons";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

export default props => {
  const { errors } = getDialogProps(props.route);
  const ErrorTemplate = listTemplates.offlineErrors;
  useSetOptions({
    headerTitle: "Offline Errors",
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
            color="white"
            size={24}
          />
        }
      />
    )
  });
  return (
    <FlatList
      data={errors}
      renderItem={({ item }) => <ErrorTemplate {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
