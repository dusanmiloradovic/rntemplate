import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getPickerList } from "mplus-react";

const textStyle = {
  color: "#86939E",
  fontWeight: "bold",
  fontSize: 15,
  marginLeft: 10,
  marginTop: 10,
};

/* HOC can't use hooks, we need to make ordinary function */
const SPicker = (props) => {
  const [picked, setPicked] = useState(props.pickerValue);
  const changeMaxValue = (value) => {
    if (value != picked) {
      props.changeListener(value);
      setPicked(value);
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View>
      <Text style={textStyle}>{props.label}</Text>
      <Picker
        selectedValue={props.pickerValue}
        onValueChange={(itemValue, itemIndex) => {
          props.changeListener(itemValue);
        }}
      >
        {props.rows.map(({ label, value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

const PickerList = getPickerList(
  (label, selected, optionKey, optionVal, changeListener) => {
    return {
      label,
      selected,
      value: optionKey,
      label: optionVal,
      changeListener,
    };
  },
  (label, changeListener, rows, props) => {
    const filteredSelected = rows.filter(({ selected }) => selected)[0];
    const fsVal = filteredSelected ? filteredSelected.value : null;
    const pickerValue = props.pickerValue || fsVal;

    if (!pickerValue) return null;
    return (
      <SPicker
        label={label}
        pickerValue={pickerValue}
        rows={rows}
        changeListener={changeListener}
      />
    );
  }
);
export default PickerList;
