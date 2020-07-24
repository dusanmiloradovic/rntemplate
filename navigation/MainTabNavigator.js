import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";
import ListScreen from "../screens/ListScreen";
import SectionScreen from "../screens/SectionScreen";
import QbeSectionScreen from "../screens/QbeSectionScreen";
import POListScreen from "../screens/POList";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import POQbeSection from "../screens/POQbeSection";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "List") {
          iconName = platformPrefix + "-list";
        }
        if (route.name === "Details") {
          iconName = platformPrefix + "-link";
        }
        if (route.name === "Search") {
          iconName = platformPrefix + "-search";
        }

        return (
          <Ionicons
            name={iconName}
            size={size}
            //            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            color={color}
          />
        );
      }
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }}
  >
    <Tab.Screen name="List" component={POListScreen} />
    <Tab.Screen name="Details" component={SectionScreen} />
    <Tab.Screen
      options={{
        title: "Search"
      }}
      name="Search"
      component={POQbeSection}
    />
  </Tab.Navigator>
);
