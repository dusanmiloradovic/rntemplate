import React from "react";
import SimpleMapAdapter from "./SimpleMapAdapter";

export default () => (
  <SimpleMapAdapter
    container="posingle"
    columns={["ponum", "description", "vendor"]}
  />
);
