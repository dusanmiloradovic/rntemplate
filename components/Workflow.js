import React, { useEffect, useContext } from "react";
import { Section } from "./Section";
import { Button } from "react-native-elements";
import { getWorkflowDialog } from "mplus-react";
import { View, Platform } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import StackNavContext from "../navigation/StackNavContext";
import { closeDialog } from "../utils/utils";
import { Ionicons } from "@expo/vector-icons";

const WFMessages = props => {
  useEffect(() => {
    if (props.messages && props.messages.length > 0) {
      let txt = "";
      for (let j = 0; j < props.messages.length; j++) {
        if (j > 0) txt += "\n";
        txt += props.messages[j];
      }
      showMessage(txt);
    }
  });
  return null;
};

/* the purpose is to put props to dialog, to display the buttons and the title in the header */
const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
const WFWrapper = ({ buttons, wfTitle, section, warnings }) => {
  const { setOptions } = useContext(StackNavContext);
  useEffect(
    () => {
      const headerRight = () => (
        <View style={{ flexDirection: "row", marginRight: 5 }}>
          {buttons.map(({ buttonKey, action, title }) => (
            <Button
              key={buttonKey}
              type="clear"
              style={{ marginRight: 5 }}
              onPress={action}
            />
          ))}
        </View>
      );
      setOptions({
        headerLeft: () => (
          <Button
            color="#fff"
            onPress={closeDialog}
            type="clear"
            style={{ marginRight: 5 }}
            icon={
              <Ionicons
                style={{ padding: 3 }}
                name={platformPrefix + "-arrow-back"}
                color="white"
                size={24}
              />
            }
          />
        ),
        headerTitle: wfTitle ? wfTitle : "Workflow",
        headerRight
      });
    },
    [buttons, wfTitle]
  );
  return (
    <View>
      {section}
      <WFMessages messages={warnings} />
    </View>
  );
};

export default getWorkflowDialog(
  Section,
  (title, section, actions, warnings) => {
    const buttons = Object.keys(actions).map(buttonKey => {
      return {
        buttonKey,
        title: actions[buttonKey].label,
        action: actions[buttonKey].actionFunction
      };
    });
    return (
      <WFWrapper
        title={title}
        section={section}
        buttons={buttons}
        warnings={warnings}
      />
    );
  }
);
