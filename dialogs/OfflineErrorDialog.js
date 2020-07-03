import React, { Component } from "react";
import { FlatList } from "react-native";
import { closeDialog } from "../utils/utils";
import listTemplates from "../components/listTemplates";

import {
  HeaderButtons,
  Item,
  HeaderButton
} from "react-navigation-header-buttons";

export default class extends Component {
  static navigationOptions = {
    headerTitle: "Offline failures",
    headerRight: (
      <HeaderButtons>
        <Item onPress={closeDialog} title="Close" />
      </HeaderButtons>
    )
  };

  render() {
    const { errors } = this.props.navigation.getParam("dialog");
    const ErrorTemplate = listTemplates.offlineErrors;
    return (
      <FlatList
        data={errors}
        renderItem={({ item }) => <ErrorTemplate {...item} />}
        keyExtractor={item => item.id}
      />
    );
  }
}
