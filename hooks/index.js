import React, { useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import StackNavContext from "../navigation/StackNavContext";

export const useSetOptions = options => {
  const navigation = useNavigation();
  const { setOptions } = useContext(StackNavContext);
  const firstRun = useRef(true);
  if (firstRun.current) {
    setOptions(options);
    firstRun.current = false;
  }
  useEffect(() => {
    if (navigation) {
      navigation.addListener("focus", e => {
        setOptions(options);
      });
      navigation.addListener("blur", e => {
        setOptions(null);
      });
    }
    return () => {
      console.log("REMOVING THE LISTENER**********");
      setOptions(null);
    };
  }, []);
};
