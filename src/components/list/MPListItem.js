import React from "react";
import listTemplates from "../listTemplates";
import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity, View, Text } from "react-native";

export default (props) => {
  const navigation = useNavigation();
  const ListTemplate = listTemplates[props.listTemplate];
  const _onPress = () => {
    props.rowAction(props.mxrow);
    //props.navigation.navigate("Details");
    if (props.navigate) {
      props.navigate(navigation);
    }
  };
  //  return (
  //    <TouchableOpacity onPress={_onPress}>
  //      <ListTemplate {...props.data} />
  //    </TouchableOpacity>
  //  );
  return (
    <TouchableOpacity onPress={_onPress}>
      <View>
        <Text>Bla</Text>
      </View>
    </TouchableOpacity>
  );
};
