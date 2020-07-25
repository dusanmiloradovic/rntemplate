import React, { useState, useRef } from "react";
import MPListItem from "./MPListItem";
import { FlatList, View, ActivityIndicator, Image } from "react-native";
import { useInView } from "react-intersection-observer";
import { useSetOptions } from "../../hooks";

export default props => {
  const [fetching, setFetching] = useState(null);
  const footLoaderInvisible = useRef(null); //to prevent from excessive fetching
  const currentDataCount = useRef(0);
  const scrolled = useRef(false);
  useSetOptions(
    props.options
      ? props.options
      : {
          headerTitle: props.label
        }
  );
  const FooterLoader = ({ datalength }) => {
    const [ref, inView, entry] = useInView();
    scrolled.current = false; //when re render
    if (inView && !fetching) {
      if (fetching == null) {
        setFetching(false);
        return null;
      }

      requestAnimationFrame(_ => {
        if (!scrolled.current || datalength === currentDataCount.current) {
          return;
        }

        currentDataCount.current = datalength;
        setFetching(true);
        props.fetchMore(5);
        setTimeout(() => setFetching(false), 200);
      });
    }
    return (
      <div ref={ref} style={{ width: "100%", height: 50 }}>
        {fetching ? (
          <ActivityIndicator animating size="large" style={{ marginTop: 10 }} />
        ) : null}
      </div>
    );
  };

  if (!props.data || props.data.length === 0) return null;

  return (
    <div
      style={{ height: "100%", width: "100%", overflowY: "scroll" }}
      onScroll={ev => {
        scrolled.current = true;
      }}
    >
      <ul
        style={{
          marginBlockStart: 0,
          marginBlockEnd: 0,
          padding: 0
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
      <FooterLoader datalength={props.data.length} />
    </div>
  );
};
