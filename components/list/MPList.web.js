import React, { useState, PureComponent } from "react";
import MPListItem from "./MPListItem";
import { FlatList, View, ActivityIndicator } from "react-native";

export default props => {
  const [fetching, setFetching] = useState(null); //to prevent from excessive fetching

  const FooterWait = () => {
    return props.waiting ? (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    ) : null;
  };
  if (!props.data || props.data.length === 0) return null;
  console.log(props.data);
  return (
    <div style={{ height: "100%", width: "100%", overflowY: "scroll" }}>
      <ul
        style={{
          marginBlockStart: "0px",
          marginBlockEnd: "0px",
          padding: "0px"
        }}
      >
        {props.data.map(item => (
          <MPListItem
            {...item}
            listTemplate={props.listTemplate}
            navigate={props.navigate}
          />
        ))}
      </ul>
    </div>
  );
};
