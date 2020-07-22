import React, { Component, useContext } from "react";
import NavigationService from "../navigation/NavigationService";
import MaxList from "../components/Mlist";
import {
  useNavigation,
  Button,
  View,
  CommonActions
} from "@react-navigation/native";
import { StackNavContext } from "../navigation/AppNavigator";
import { useFocusEffect } from "@react-navigation/native";

export default props => {
  //  const navigation = useNavigation();
  const navigation = props.navigation;
  const { setOptions } = useContext(StackNavContext);
  //  useFocusEffect(
  //    React.useCallback(
  //      () => {
  //        setOptions({ headerTitle: "List" });
  //        return () => {
  //          setOptions(null);
  //        };
  //      },
  //      [setOptions]
  //    )
  //  );
  return (
    <MaxList
      listTemplate="po"
      container="pocont"
      columns={["ponum", "description", "status"]}
      norows={20}
      initdata={true}
      navigate={navigation => navigation.navigate("Details")}
    />
  );
};
