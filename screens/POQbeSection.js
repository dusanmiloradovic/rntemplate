import React from "react";
import { QbeSection } from "../components/Section";

export default props => {
  return (
    <QbeSection
      container="pocont"
      columns={["ponum", "description", "status", "shipvia"]}
      navigateTo="List"
      navigation={props.navigation}
    />
  );
};
