import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListScreen from "../screens/ListScreen";
import SectionScreen from "../screens/SectionScreen";
import QbeSectionScreen from "../screens/QbeSectionScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "List") {
          iconName = "list";
        }
        if (route.name === "Details") {
          iconName = "link";
        }
        if (route.name === "Search") {
          iconName = "search";
        }

        if (route.name === "Map") {
          iconName = "map";
        }
        return (
          <Ionicons
            name={iconName}
            size={size}
            //            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            color={color}
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="List" component={ListScreen} />
    <Tab.Screen name="Details" component={SectionScreen} />
    <Tab.Screen
      options={{
        title: "Search",
      }}
      name="Search"
      component={QbeSectionScreen}
    />
  </Tab.Navigator>
);
