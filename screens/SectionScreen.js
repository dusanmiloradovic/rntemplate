import React from "react";
import { Section } from "../components/Section";
import { save } from "mplus-react";
import { Button } from "react-native-elements";
import { View, Platform } from "react-native";
import MoreButton from "../components/MoreButton";
import {
  openPhotoUpload,
  openDocumentUpload,
  openDialog
} from "../utils/utils";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

const saveAction = () => save("posingle");

export default props => (
  <Section
    container="posingle"
    label="PO Details"
    options={{
      headerTitle: "PO Details",
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 5 }}>
          <Button
            onPress={saveAction}
            title="Save"
            color="#fff"
            type="clear"
            style={{ marginRight: 5 }}
          />
          <MoreButton
            actions={[
              {
                label: "Document Upload",
                icon: "cloud-upload",
                action: () => openDocumentUpload("posingle", "Attachments")
              },
              {
                label: "Photo",
                icon: "camera",
                action: ev => openPhotoUpload("posingle")
              },
              {
                label: "Test dialog",
                action: () => openDialog({ type: "testDialog" })
              }
            ]}
          />
        </View>
      )
    }}
    columns={[
      "ponum",
      "description",
      "status",
      "shipvia",
      "orderdate",
      "vendor",
      "vendor.phone",
      "revcomments",
      "po9"
    ]}
    metadata={{
      SHIPVIA: {
        hasLookup: true,
        listTemplate: "valuelist"
      },
      "VENDOR.PHONE": {
        phonenum: true
      },
      PO9: { barcode: true }
    }}
  />
);
