import React from "react";
import { QbeSection } from "../components/Section";

export default props => (
  <QbeSection
    container="pocont"
    columns={["ponum", "description", "status", "shipvia"]}
    navigate={navigation => navigation.navigate("List")}
    label="Search POs"
  />
);
