import React from "react";
import { CommonActions, StackActions } from "@react-navigation/native";
//StackActins will be used for the dialogs in this template

export const navigationRef = React.createRef();

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
  navigationRef.current.push(dialogName, params);
}

function openDialog(dialogName, params) {
  if (dialogCounter++ === 0) {
    openFirstDialog(dialogName, params);
  } else {
    openNextDialog(dialogName, params);
  }
}

//function openDialog(dialogName, params) {
//  _navigator.then(navigator =>
//    navigator.dispatch(
//      CommonActions.navigate({
//        routeName: "Dialogs",
//        params: {},
//        action: StackActions.push({ routeName: dialogName, params })
//      })
//    )
//  );
//}

//function openDialog(dialogName, params) {
//  const pushAction = StackActions.push(dialogName, params);
//  navigationRef.current.dispatch(pushAction);
//}

function closeDialog(last) {
  //if the last dialog from the dialg stack has been closed, go back
  if (--dialogCounter === 0) {
    navigationRef.current.goBack();
  } else {
    navigationRef.current.pop();
  }
}

//function pop() {
//  _navigator.then(navigator => navigator.dispatch(StackActions.pop({ n: 1 })));
//}

// add other navigation functions that you need and export them

export default {
  navigate,
  //push,
  //  pop,
  goBack,
  openDialog,
  closeDialog
};
