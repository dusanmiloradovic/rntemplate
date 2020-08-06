import React, { useState } from "react";
import { Button, ListItem } from "react-native-elements";
import { Platform, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OverflowMenu, HiddenItem } from "react-navigation-header-buttons";

export default ({ actions }) => {
  const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
  const iconName = platformPrefix + "-more";
  return actions && actions.length > 0 ? (
    <OverflowMenu
      type="clear"
      style={{ marginRight: 5 }}
      OverflowIcon={<Ionicons name={iconName} color="#2089dc" size={24} />}
    >
      {actions.map(({ action, label, icon }) => (
        <HiddenItem
          key={label}
          title={label}
          icon={
            icon ? (
              <Ionicons
                name={platformPrefix + "-" + icon}
                size={20}
                style={{ paddingRight: 5 }}
              />
            ) : null
          }
          onPress={ev => {
            action();
          }}
        />
      ))}
    </OverflowMenu>
  ) : null;
};
