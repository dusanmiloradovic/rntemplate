import React, { Component } from "react";
import Workflow from "../components/Workflow";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { closeDialog } from "../utils/utils";

export default class extends Component {
  static navigationOptions = ({ navigation }) => {
    const _buttons = navigation.getParam("wfButtons");
    const buttons = _buttons
      ? _buttons.map(b => {
          return { key: b.buttonKey, action: b.action, label: b.title };
        })
      : [];
    const fullButtons = [
      ...buttons,
      { key: "close", action: closeDialog, label: "Close" }
    ];

    const title = navigation.getParam("wfTitle");
    const headerTitle = title ? title : "workflow";
    return {
      headerTitle,
      headerRight: <HeaderActionButtons buttons={fullButtons} />
    };
  };
  render() {
    const { container, processName } = this.props.navigation.getParam("dialog");
    return <Workflow container={container} processname={processName} />;
  }
}
