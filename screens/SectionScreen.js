import React, { Component } from "react";
import { Section } from "../components/Section";

export default class extends Component {
  static navigationOptions = ({ navigatiopn }) => {
    return {
      headerTitle: "Details"
    };
  };
  render() {
    return (
      <Section
        container="pocont"
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
      />
    );
  }
}
