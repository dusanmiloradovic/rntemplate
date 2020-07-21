import React, { Component, useContext, useCallback } from "react";
import { Section } from "../components/Section";
import { View, Button, useNavigaion } from "react-native";
import { StackNavContext } from "../navigation/AppNavigator";
import { useFocusEffect } from "@react-navigation/native";

export default props => {
  const { setOptions } = useContext(StackNavContext);
  useFocusEffect(
    useCallback(
      () => {
        console.log("Section scresen focus effect");
        setOptions({ headerTitle: "Section Screen 13" });
        return () => {
          setOptions(null);
        };
      },
      [setOptions]
    )
  );

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
};
