import React from "react";
import MaxList from "../components/Mlist";

export default props => (
  <MaxList
    listTemplate="po"
    container="pocont"
    label="PO List"
    columns={["ponum", "description", "status"]}
    norows={20}
    initdata={true}
    navigate={navigation => navigation.navigate("Details")}
  />
);
