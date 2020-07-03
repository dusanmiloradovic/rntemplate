import React from "react";
import Calendar from "react-calendar";
import Modal from "modal-react-native-web";
import "react-calendar/dist/Calendar.css";
import { AntDesign } from "@expo/vector-icons";

export default ({ date, isVisible, onConfirm, onCancel }) => (
  <Modal visible={isVisible}>
    <div
      style={{ position: "absolute", top: "10px", right: "10px" }}
      onClick={onCancel}
    >
      <AntDesign name="close" size={24} color="black" />
    </div>
    <div style={{ margin: "auto", width: "80%", paddingLeft: "20%" }}>
      <Calendar value={date} onChange={onConfirm} />
    </div>
  </Modal>
);
