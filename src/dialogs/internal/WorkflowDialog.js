import React from "react";
import { Button } from "react-native-elements";
import Workflow from "../../components/Workflow";
import { getDialogProps } from "../../navigation/NavigationService";
import { useSetOptions } from "../../hooks";
import { Ionicons } from "@expo/vector-icons";
import { openDialog, closeDialog } from "../../utils/utils";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

export default (props) => {
  useSetOptions({
    headerTitle: "Workflow",
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
            size={24}
          />
        }
      />
    ),
  });
  const { container, processName } = getDialogProps(props.route);
  return <Workflow container={container} processname={processName} />;
};
