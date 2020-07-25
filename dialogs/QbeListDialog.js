import React, { Component } from "react";
import MList from "../components/Mlist";
import NavigationService from "../navigation/NavigationService";
import { closeDialog } from "../utils/utils";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

/*
Except for the title, the component is exactly the same as the ListDialog (qbe parts will be handled by framework. Copy/paste approach to demonstrate simplicity, you can choose the other if you want
 */

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
        headerTitle: "Pick one ore more values",
        headerLeft: () => (
          <Button
            title="OK"
            color="#fff"
            onPress={closeDialog}
            type="clear"
            style={{ marginRight: 5 }}
            icon={
              <Ionicons
                style={{ marginRight: 6 }}
                name={iconName}
                size={24}
                color="#2089dc"
              />
            }
          />
        )
      }}
    />
  );
};
