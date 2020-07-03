import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { Input, Icon } from "react-native-elements";
import DatePicker from "./DatePicker";
import NavigationService from "../../navigation/NavigationService";
import { openBarcodeScan } from "../../utils/utils";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { calendarVisible: false, date: new Date() };
  }
  dateConfirm = date => {
    if (this.props.changeListener) {
      this.props.immediateChangeListener(date);
    } else {
      this.props.listener(date);
    }
    this.setState({ calendarVisible: false });
  };
  dateCancel = () => {
    this.setState({ calendarVisible: false });
  };
  render() {
    let rightAction = null;
    if (
      this.props.showLookupF &&
      typeof this.props.showLookupF === "function"
    ) {
      rightAction = {
        type: "font-awesome",
        name: "angle-down",
        onPress: this.props.showLookupF
      };
    }
    if (this.props.type === "DATE" || this.props.type === "DATETIME") {
      const calendarF = _ => {
        this.setState({ calendarVisible: true, date: this.props.value });
      };
      rightAction = {
        type: "font-awesome",
        name: "calendar",
        onPress: calendarF
      };
    }
    if (this.props.metadata && this.props.metadata.phonenum) {
      const phoneF = () => Linking.openURL(`tel:${this.props.value}`);
      rightAction = { type: "font-awesome", name: "phone", onPress: phoneF };
    }
    if (this.props.metadata && this.props.metadata.barcode) {
      const barcodeF = () =>
        openBarcodeScan(val => {
          if (this.props.changeListener) {
            this.props.immediateChangeListener(val);
          } else {
            this.props.listener(val);
          }
        });
      rightAction = {
        type: "font-awesome",
        name: "barcode",
        onPress: barcodeF
      };
    }

    return (
      <View key={this.props.fieldKey}>
        {this.props.type === "DATE" || this.props.type === "DATETIME" ? (
          <DatePicker
            date={new Date(this.state.date || new Date())}
            isVisible={this.state.calendarVisible}
            onConfirm={this.dateConfirm}
            onCancel={this.dateCancel}
          />
        ) : null}
        <Input
          key={this.props.fieldKey}
          label={this.props.label}
          onChangeText={val => this.props.listener(val)}
          onBlur={ev => {
            // for qbe no changeLstener
            if (this.props.changeListener) {
              this.props.changeListener();
            }
          }}
          editable={this.props.enabled}
          required={this.props.required}
          value={this.props.value == null ? "" : this.props.value}
          rightIcon={rightAction}
        />
      </View>
    );
  }
}
