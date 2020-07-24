import React from "react";
import { QbeSection } from "../components/Section";

export default props => (
  <QbeSection
    container="pocont"
    columns={["ponum", "description", "status", "shipvia"]}
    navigateTo="List"
    navigation={props.navigation}
    label="Search POs"
  />
);
