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
import TestDialog from "../dialogs/internal/TestDialog";

const Stack = createStackNavigator();

export default (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="list"
      component={ListDialog}
      options={{ title: "Select a value", headerShown: false }}
    />
    <Stack.Screen
      name="qbelist"
      component={QbeListDialog}
      options={{ title: "Select one or more values", headerShown: false }}
    />
    <Stack.Screen
      name="workflow"
      options={{ headerShown: false }}
      component={WorkflowDialog}
    />
    <Stack.Screen
      name="photoUpload"
      options={{ headerShown: false }}
      component={PhotoUpload}
    />
    <Stack.Screen
      name="documentUpload"
      options={{ headerShown: false }}
      component={DocumentUpload}
    />
    <Stack.Screen
      name="documentViewer"
      options={{ headerShown: false }}
      component={DocumentViewer}
    />
    <Stack.Screen
      name="barcodeScan"
      options={{ headerShown: false }}
      component={BarcodeScan}
    />
    <Stack.Screen
      name="offlineError"
      options={{ headerShown: false }}
      component={OfflineError}
    />
    <Stack.Screen
      name="testDialog"
      options={{ headerShown: false }}
      component={TestDialog}
    />
  </Stack.Navigator>
);
