import React, { Component } from "react";
import MList from "../components/Mlist";
import { closeDialog } from "../utils/utils";
import { Button } from "react-native-elements";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButtons,
  Item,
  HeaderButton
} from "react-navigation-header-buttons";

export default props => {
  const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
  const iconName = platformPrefix + "-arrow-back";
  const d = props.route.params["dialog"];
  return (
    <MList
      norows={20}
      listTemplate={d.field.getMetadata().listTemplate}
      filterTemplate={d.field.getMetadata().filterTemplate}
      maxcontainer={d.listContainer}
      initdata={true}
      columns={d.dialogCols}
      selectableF={d.defaultAction}
      showWaiting={true}
      options={{
        headerTitle: "Pick a value",
        headerLeft: () => (
          <Button
            color="#fff"
            onPress={closeDialog}
            type="clear"
            style={{ marginRight: "5px" }}
            icon={
              <Ionicons style={{ padding: "3px" }} name={iconName} size={24} />
            }
          />
        )
      }}
    />
  );
};
