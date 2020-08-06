import React, { Component } from "react";
import Workflow from "../../components/Workflow";
import { getDialogProps } from "../../navigation/NavigationService";

export default class extends Component {
  render() {
    const { container, processName } = getDialogProps(this.props.route);
    return <Workflow container={container} processname={processName} />;
  }
}
