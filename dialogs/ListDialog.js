import React, { Component } from "react";
import MList from "../components/Mlist";
import { closeDialog } from "../utils/utils";
import { Button } from "react-native";
import {
  HeaderButtons,
  Item,
  HeaderButton
} from "react-navigation-header-buttons";

export default class extends Component {
  static navigationOptions = {
    headerTitle: "Pick a value",
    headerRight: (
      <HeaderButtons>
        <Item onPress={closeDialog} title="Close" />
      </HeaderButtons>
    )
  };
  render() {
    const d = this.props.route.params["dialog"];
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
