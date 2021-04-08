import React from "react";
import { getComponentAdapter } from "mplus-react";
import SimpleMap from "../components/SimpleMap";
const Wrapped = ({ data, setMaxValue }) => {
  let coords = null;
  if (data && data.DESCRIPTION) {
    const splitted = data.DESCRIPTION.split(",");
    if (splitted.length === 2) {
      coords = { latitude: splitted[0], longitude: splitted[1] };
    }
  }
  const onLocationPress = ({ longitude, latitude }) => {
    setMaxValue("DESCRIPTION", longitude + "," + latitude);
  };
  return (
    <SimpleMap
      coords={coords}
      title={data && data.PONUM}
      description={data && data.VENDOR}
      onLocationPress={onLocationPress}
    />
  );
};
const SimpleMapAdapter = getComponentAdapter(Wrapped);
export default SimpleMapAdapter;
