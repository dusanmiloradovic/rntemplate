import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
export default props => (
  // the `props` here come from <Item .../>
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />
);
