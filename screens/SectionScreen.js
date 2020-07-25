import React from "react";
import { Section } from "../components/Section";
import { save } from "mplus-react";
import { Button } from "react-native-elements";
import { View } from "react-native";

const saveAction = () => save("posingle");

export default props => (
  <Section
    container="posingle"
    label="PO Details"
    options={{
      headerTitle: "PO Details",
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: "5px" }}>
          <Button
            onPress={saveAction}
            title="Save"
            color="#fff"
            type="clear"
            style={{ marginRight: "5px" }}
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
