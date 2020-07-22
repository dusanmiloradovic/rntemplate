import React, { useState, PureComponent } from "react";
import MPListItem from "./MPListItem";
import { FlatList, View, ActivityIndicator, Image } from "react-native";
import { useInView } from "react-intersection-observer";
import { useSetOptions } from "../../hooks";

function LogoTitle() {
  return (
    <Image
      style={{ height: "40px" }}
      source={require("../../assets/images/color_logo_transparent_background.png")}
    />
  );
}
export default props => {
  const [fetching, setFetching] = useState(false); //to prevent from excessive fetching
  useSetOptions({
    headerTitle: props => <LogoTitle {...props} />
  });
  const FooterLoader = () => {
    const [ref, inView, entry] = useInView();

    if (inView && !fetching) {
      setFetching(true);
      props.fetchMore(5);
      setTimeout(() => setFetching(false), 200);
    }
    return (
      <div ref={ref} style={{ width: "100%", height: "50px" }}>
        {fetching ? <ActivityIndicator animating size="large" /> : null}
      </div>
    );
  };

  if (!props.data || props.data.length === 0) return null;
  console.log(props);
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
      <FooterLoader />
    </div>
  );
};
