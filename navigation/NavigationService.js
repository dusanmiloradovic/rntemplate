import React from "react";
import { CommonActions, StackActions } from "@react-navigation/native";
//StackActins will be used for the dialogs in this template

export const navigationRef = React.createRef();

export const navigationProps = {};
//React Navigation serializes the props, and the dialogs contain data coming from MaximoPlus core framework,
//that is not serializable and affects the performance. The navigation data will be stored temporarily here

export const navigationPropIdsStack = []; //this is used to clean up the navigationProps once the dialog is closed

export const getDialogProps = route => {
  const paramId = route.params["paramId"];
  return navigationProps[paramId] && navigationProps[paramId]["dialog"];
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function navigate(name, params) {
  //  _navigator.then(navigator => {
  //    //    navigator.dispatch(
  //    //      CommonActions.navigate({
  //    //        name,
  //    //        params
  //    //      })
  //    //    )
  //    setTimeout(() => {
  //      console.log("navigate");
  //      navigator.navigate(name, params);
  //    }, 100);
  //  });
  navigationRef.current.navigate(name, params);
}

//function push(name, params) {
//  _navigator.then(navigator =>
//    navigator.dispatch(StackActions.push({ name, params }))
//  );
//}

function goBack() {
  //  _navigator.then(navigator => navigator.dispatch(NavigationActions.back({})));
  navigationRef.current.goBack();
}

let dialogCounter = 0;

function openFirstDialog(dialogName, params) {
  //this will be called only when there are no displayed dialogs already
  navigationRef.current.navigate("Dialogs", { screen: dialogName, params });
}

function openNextDialog(dialogName, params) {
  //    navigationRef.current.push({ screen: dialogName, params });
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name: "Dialogs",
      params: {},
      action: StackActions.push({ screen: dialogName, params })
    })
  );
}

function openDialog(dialogName, params) {
  const paramId = uuidv4();
  navigationProps[paramId] = params;
  navigationPropIdsStack.push(paramId);
  if (dialogCounter++ === 0) {
    openFirstDialog(dialogName, { paramId });
  } else {
    openNextDialog(dialogName, { paramId });
  }
}

function closeDialog(last) {
  //if the last dialog from the dialg stack has been closed, go back
  if (--dialogCounter === 0) {
    navigationRef.current.goBack();
  } else {
    navigationRef.current.dispatch(
      CommonActions.navigate({
        name: "Dialogs",
        params: {},
        action: StackActions.pop()
      })
    );
  }
  const staleId = navigationPropIdsStack.pop();
  delete navigationProps.staleId;
}

export default {
  navigate,
  //push,
  //  pop,
  goBack,
  openDialog,
  closeDialog
};
