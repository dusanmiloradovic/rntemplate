import React from "react";
import {
  HeaderButtons,
  Item,
  HeaderButton
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import IoniconsHeaderButton from "./IoniconsHeaderButton";
import { MaterialIcons } from "@expo/vector-icons";

export default props => {
  const displayedButtons = props.buttons
    ? props.buttons.map(b => (
        <Item
          key={b.key}
          onPress={b.action}
          title={b.label}
          iconName={props.icons && props.icons[b.key]}
          buttonStyle={props.style}
          show={b.overflow ? "never" : null}
        />
      ))
    : null;
  return (
    <HeaderButtons
      HeaderButtonComponent={IoniconsHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={23} />}
    >
      {displayedButtons}
    </HeaderButtons>
  );
};
