import React from "react";
import NavigationService from "./NavigationService";
import { createStackNavigator } from "@react-navigation/stack";
import ListDialog from "../dialogs/internal/ListDialog";
import QbeListDialog from "../dialogs/internal/QbeListDialog";
import WorkflowDialog from "../dialogs/internal/WorkflowDialog";
import PhotoUpload from "../dialogs/internal/PhotoUpload";
import DocumentUpload from "../dialogs/internal/DocumentUploader";
import DocumentViewer from "../dialogs/internal/DocumentViewer";
import BarcodeScan from "../dialogs/internal/BarcodeScan";
import OfflineError from "../dialogs/internal/OfflineErrorDialog";

const Stack = createStackNavigator();

export default props => (
  <Stack.Navigator>
    <Stack.Screen name="list" component={ListDialog} title="Select a value" />
    <Stack.Screen
      name="qbelist"
      component={QbeListDialog}
      title="Select one or more values"
    />
    <Stack.Screen name="workflow" component={WorkflowDialog} />
    <Stack.Screen name="photoUpload" component={PhotoUpload} />
    <Stack.Screen name="documentUpload" component={DocumentUpload} />
    <Stack.Screen name="documentViewer" component={DocumentViewer} />
    <Stack.Screen name="barcodeScan" component={BarcodeScan} />
    <Stack.Screen name="offlineError" component={OfflineError} />
  </Stack.Navigator>
);
