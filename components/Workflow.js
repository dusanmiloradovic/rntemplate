import React, { useEffect } from "react";
import { Section } from "./Section";
import { Button } from "react-native-elements";
import { getWorkflowDialog } from "mplus-react";
import { View } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

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
const WFWrapper = ({ buttons, wfTitle, section, warnings }) => {
  const navigation = useNavigation();
  useEffect(
    () => {
      navigation.setParams({
        wfButtons: buttons,
        wfTitle: wfTitle
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
