import React, { Component } from "react";
import MList from "../components/Mlist";
import NavigationService from "../navigation/NavigationService";
import { closeDialog } from "../utils/utils";
import {
  HeaderButtons,
  Item,
  HeaderButton
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import IoniconsHeaderButton from "../components/IoniconsHeaderButton";
/*
Except for the title, the component is exactly the same as the ListDialog (qbe parts will be handled by framework. Copy/paste approach to demonstrate simplicity, you can choose the other if you want
 */

export default class extends Component {
  static navigationOptions = {
    headerTitle: "Pick one or more values",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item onPress={closeDialog} title="Close" iconName="md-return-right" />
      </HeaderButtons>
    )
  };
  render() {
    const d = this.props.navigation.getParam("dialog");
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
      />
    );
  }
}
