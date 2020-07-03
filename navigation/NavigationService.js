import { CommonActions } from "@react-navigation/native";
//StackActins will be used for the dialogs in this template
let navigatorResolve = null;
let navigatorReject = null;
const _navigator = new Promise((resolve, reject) => {
  navigatorResolve = resolve;
  navigatorReject = reject;
});

function setTopLevelNavigator(navigatorRef) {
  navigatorResolve(navigatorRef);
}

let dialognavigatorResolve = null;
let dialognavigatorReject = null;
const _dialognavigator = new Promise((resolve, reject) => {
  dialognavigatorResolve = resolve;
  dialognavigatorReject = reject;
});

function setDialogNavigator(navigatorRef) {
  dialognavigatorResolve(navigatorRef);
}

function navigate(name, params) {
  _navigator.then(navigator => {
    //    navigator.dispatch(
    //      CommonActions.navigate({
    //        name,
    //        params
    //      })
    //    )
    setTimeout(() => {
      console.log("navigate");
      navigator.navigate(name, params);
    }, 100);
  });
}

//function push(name, params) {
//  _navigator.then(navigator =>
//    navigator.dispatch(StackActions.push({ name, params }))
//  );
//}

function goBack() {
  //  _navigator.then(navigator => navigator.dispatch(NavigationActions.back({})));
  _navigator.then(navigator => navigator.goBack());
}

const dialogCounter = 0;

function openFirstDialog(dialogName, params) {
  //this will be called only when there are no displayed dialogs already
  _navigator.then(navigator =>
    navigator.navigate("Dialogs", { screen: dialogName, params })
  );
}

function openNextDialog(dialogName, params) {
  _dialognavigator.then(navigator => {
    navigator.push(dialogName, params);
  });
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
//      NavigationActions.navigate({
//        routeName: "Dialogs",
//        params: {},
//        action: StackActions.push({ routeName: dialogName, params })
//      })
//    )
//  );
//}

function closeDialog(last) {
  //if the last dialog from the dialg stack has been closed, go back
  if (--dialogCounter === 0) {
    _navigator.then(navigator => navigator.goBack());
  } else {
    _dialognavigator.then(navigator => navigator.pop());
  }
}

//function pop() {
//  _navigator.then(navigator => navigator.dispatch(StackActions.pop({ n: 1 })));
//}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  //push,
  //  pop,
  goBack,
  openDialog,
  closeDialog
};
