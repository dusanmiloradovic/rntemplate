import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/Login";
import DialogNavigator from "./DialogNavigation";

const Stack = createStackNavigator();
export default ({ loggedIn, setLoggedIn, options }) => {
  return (
    <>
      <Stack.Navigator>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="Main"
              options={options ? options : { headerTitle: "" }}
              component={MainTabNavigator}
            />
            <Stack.Screen
              name="Dialogs"
              options={options ? options : { headerTitle: "" }}
              component={DialogNavigator}
            />
          </>
        ) : (
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </>
  );
};
