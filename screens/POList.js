import React, { Component } from "react";
import NavigationService from "../navigation/NavigationService";
import MaxList from "../components/Mlist";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();
  return (
    <MaxList
      listTemplate="po"
      container="pocont"
      columns={["ponum", "description", "status"]}
      selectableF={_ => {
        console.log("navigating to details");
        navigation.jumpTo("Details");
      }}
      norows={20}
      initdata={true}
    />
  );
};
