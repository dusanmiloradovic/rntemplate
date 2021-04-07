import React from "react";
import { getComponentAdapter } from "mplus-react";
import SimpleMap from "../components/SimpleMap";
const SimpleMapAdapter = getComponentAdapter(({ data, setMaxValue }) => {
  let coords = null;
  if (data && data.DESCRIPTION) {
    const splitted = data.DESCRIPTION.split(",");
    if (splitted.length === 2) {
      coords = { latitude: splitted[0], longitude: splitted[1] };
    }
  }
  return (
    <SimpleMap
      coords={coords}
      title={data && data.PONUM}
      description={data && data.VENDOR}
      onLocationPress={({ longitude, latitude }) => {
        setMaxValue("DESCRIPTION", longitude + "," + latitude);
      }}
    />
  );
});
export default SimpleMapAdapter;
