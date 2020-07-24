import React, { useState, PureComponent } from "react";
import MPListItem from "./MPListItem";
import { FlatList, View, ActivityIndicator } from "react-native";
import { useSetOptions } from "../../hooks";

export default props => {
  const [fetching, setFetching] = useState(null); //to prevent from excessive fetching
  useSetOptions({
    headerTitle: props.label
  });

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

  return (
    <FlatList
      ListFooterComponent={FooterWait}
      data={props.data}
      renderItem={({ item }) => (
        <MPListItem
          {...item}
          listTemplate={props.listTemplate}
          navigate={props.navigate}
        />
      )}
      onEndReached={ev => {
        //        console.log("end reached");
        requestAnimationFrame(_ => {
          if (fetching === null) {
            //initially don't fetch more, this is triggered even first time on render
            setFetching(false);
            return;
          } else {
            if (!fetching) {
              setFetching(true);
              props.fetchMore(5);
              setTimeout(() => {
                setFetching(false);
              }, 200);
            }
          }
        });
      }}
      keyExtractor={item => item.key.toString()}
    />
  );
};
