import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { setDialogHolder } from "./utils/utils";
import Containers from "./Containers";
import AppNavigator from "./navigation/AppNavigator";
import StackNavContext from "./navigation/StackNavContext";
import { NavigationContainer } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { navigationRef } from "./navigation/NavigationService";
import { MenuProvider } from "react-native-popup-menu";
import {
  setServerRoot,
  setGlobalWait,
  removeGlobalWait,
  setOnLoggedOff
} from "mplus-react";

import "./utils/boot";

import {
  AppContainer,
  SingleMboContainer,
  RelContainer,
  setExternalRootContext
} from "mplus-react";

import { ContextPool } from "react-multiple-contexts";
//import { useScreens } from "react-native-screens";
//useScreens();

import DialogHolder from "./screens/Dialogs";
import FlashMessage from "react-native-flash-message";

import "./utils/db";
import "./utils/offline";
import "./utils/startup";

const rootContext = React.createContext(null);
setExternalRootContext(rootContext);

//setOnLoggedOff(err =>
var loggerResolver = null;
const loggerPromise = new Promise((resolve, reject) => {
  loggerResolver = resolve;
});

maximoplus.core.setOnLoggedOff(err => {
  console.log("logged off");
  loggerPromise.then(setLoggedIn => {
    setLoggedIn(false);
  });
});

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [waitCursor, setWaitCursor] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [options, setOptions] = useState(null);

  loggerResolver(setLoggedIn);
  setGlobalWait(() => {
    setWaitCursor(true);
  });

  removeGlobalWait(() => {
    setWaitCursor(false);
  });

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ContextPool rootContext={rootContext} initialSize={10} minimumFree={3}>
        <StackNavContext.Provider value={{ options, setOptions }}>
          <MenuProvider>
            <NavigationContainer ref={navigationRef}>
              <Containers />
              <DialogHolder
                ref={dialogHolderRef => {
                  setDialogHolder(dialogHolderRef);
                }}
              />
              <View style={styles.container}>
                <Spinner visible={waitCursor} />
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}

                <AppNavigator
                  setLoggedIn={setLoggedIn}
                  loggedIn={loggedIn}
                  options={options}
                />
                <FlashMessage position="bottom" />
              </View>
            </NavigationContainer>
          </MenuProvider>
        </StackNavContext.Provider>
      </ContextPool>
    );
  }
}

async function loadResourcesAsync() {
  //  await Promise.all([
  //    Asset.loadAsync([
  //      require("./assets/images/robot-dev.png"),
  //      require("./assets/images/robot-prod.png")
  //    ]),
  //    Font.loadAsync({
  //      // This is the font that we are using for our tab bar
  //      ...Ionicons.font,
  //      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
  //      // remove this if you are not using it in your app
  //      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
  //    })
  //  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
