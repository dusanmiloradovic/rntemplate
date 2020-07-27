import React, { useState } from "react";
import { Button, ListItem } from "react-native-elements";
import { Platform, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);
const optionsWidth = Math.round(0.4 * screenWidth);
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
export default ({ actions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
  const iconName = platformPrefix + "-more";
  return actions && actions.length > 0 ? (
    <View>
      <Button
        type="clear"
        style={{ marginRight: 5 }}
        icon={<Ionicons name={iconName} color="#2089dc" size={24} />}
        onPress={ev => setMenuOpen(true)}
      />
      {menuOpen ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: optionsWidth
          }}
        >
          {actions.map(({ action, label, icon }) => (
            <ListItem
              key={label}
              title={label}
              leftIcon={
                icon ? (
                  <Ionicons
                    name={platformPrefix + "-" + icon}
                    size={20}
                    style={{ paddingRight: 5 }}
                  />
                ) : null
              }
              onPress={ev => {
                setMenuOpen(false);
                action();
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  ) : null;
};
