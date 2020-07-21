import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./NavigationService";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/Login";
import DialogNavigator from "./DialogNavigation";

export const StackNavContext = React.createContext({
  option: null,
  setOptions: () => {}
});

const Stack = createStackNavigator();
export default ({ loggedIn, setLoggedIn }) => {
  const [options, setOptions] = useState(null);
  return (
    <StackNavContext.Provider value={{ options, setOptions }}>
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >
        <Stack.Navigator>
          {loggedIn ? (
            <>
              <Stack.Screen
                name="Main"
                options={options ? options : { headerTitle: "MainStack" }}
                component={MainTabNavigator}
              />
              <Stack.Screen
                name="Dialogs"
                options={options ? options : { headerTitle: "DialogStack" }}
                component={DialogNavigator}
              />
            </>
          ) : (
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StackNavContext.Provider>
  );
};
