import React, { useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import StackNavContext from "../navigation/StackNavContext";

export const useSetOptions = (options, trigger) => {
  const navigation = useNavigation();
  const { setOptions } = useContext(StackNavContext);
  const firstRun = useRef(true);
  setTimeout(() => {
    if (firstRun.current) {
      setOptions(options);
      firstRun.current = false;
    }
  }, 0);
  useEffect(
    () => {
      if (navigation) {
        navigation.addListener("focus", e => {
          setOptions(options);
        });
        navigation.addListener("blur", e => {
          setOptions(null);
        });
      }
      return () => {
        //        console.log("REMOVING THE LISTENER**********");
        //   setOptions(null);
        // firstRun.current = null;
      };
    },
    [trigger]
  );
};
