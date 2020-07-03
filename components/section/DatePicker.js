import React, { Component } from "react";
import DatePicker from "react-native-modal-datetime-picker";

export default ({ date, isVisible, onConfirm, onCancel }) => (
  <DatePicker
    date={date}
    isVisible={isVisible}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
