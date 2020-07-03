import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./NavigationService";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/Login";
import DialogNavigator from "./DialogNavigation";

const Stack = createStackNavigator();
export default ({ loggedIn, setLoggedIn }) => (
  <NavigationContainer
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  >
    <Stack.Navigator>
      {loggedIn ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Dialogs" component={DialogNavigator} />
        </>
      ) : (
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
