import React from "react";
import { Section } from "../components/Section";

export default props => (
  <Section
    container="pocont"
    label="PO Details"
    columns={[
      "ponum",
      "description",
      "status",
      "shipvia",
      "orderdate",
      "vendor",
      "vendor.phone",
      "revcomments"
    ]}
    metadata={{
      SHIPVIA: {
        hasLookup: true,
        listTemplate: "valuelist"
      }
    }}
  />
);
