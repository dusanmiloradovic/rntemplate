import React, { PureComponent } from "react";
import { getDialogHolder } from "mplus-react";
import { View } from "react-native";
import NavigationService from "../navigation/NavigationService";
/*
Dialogs are the data pushed through the "dialogs" context. The wrpper has to be outside the navigation and to route when the new dialog is pushed.
When the new dialog comes on stack, we navigate to the child of the Dialog stack navigator. If the value is removed,we pop the value from the
Dialog stack navigator. If no more values after move, we goBack from the Dialog stack navigator to prev screen
*/
class DialogWrapper extends PureComponent {
  render() {
    const currDialog =
      this.props.dialogs && this.props.dialogs[this.props.dialogs.length - 1];
    return <View />;
  }
  componentDidUpdate(prevProps) {
    if (this.props.dialogs) {
      if (
        prevProps.dialogs &&
        this.props.dialogs.length < prevProps.dialogs.length
      ) {
        //          NavigationService.goBack();
        NavigationService.closeDialog(this.props.dialogs.length === 0);
      }
      if (
        !prevProps.dialogs ||
        this.props.dialogs.length > prevProps.dialogs.length
      ) {
        const currDialog =
          this.props.dialogs &&
          this.props.dialogs[this.props.dialogs.length - 1];
        if (currDialog)
          //          NavigationService.navigate(currDialog.type, { dialog: currDialog });
          NavigationService.openDialog(currDialog.type, { dialog: currDialog });
      }
    }
    //    console.log("modify the dialog");
    //    console.log(this.props);
  }
}

export default getDialogHolder(DialogWrapper, null, true);
