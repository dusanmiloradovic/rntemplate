import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListDialog from "../dialogs/ListDialog";
import QbeListDialog from "../dialogs/QbeListDialog";
import WorkflowDialog from "../dialogs/WorkflowDialog";
//import PhotoUpload from "../dialogs/PhotoUpload";
//import DocumentUpload from "../dialogs/DocumentUploader";
//import DocumentViewer from "../dialogs/DocumentViewer";
import BarcodeScan from "../dialogs/BarcodeScan";
import OfflineError from "../dialogs/OfflineErrorDialog";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="list" component={ListDialog} title="Select a value" />
    <Stack.Screen
      name="qbelist"
      component={QbeListDialog}
      title="Select one or more values"
    />
    <Stack.Screen name="workflow" component={WorkflowDialog} />
    <Stack.Screen name="barcodeScan" component={BarcodeScan} />
    <Stack.Screen name="offlineError" component={OfflineError} />
  </Stack.Navigator>
);
