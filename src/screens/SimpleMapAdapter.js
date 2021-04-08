import React from "react";
import { getComponentAdapter } from "mplus-react";
import SimpleMap from "../components/SimpleMap";

const SimpleMapAdapter = getComponentAdapter(({ data, setMaxValue }) => {
  let coords = null;

  if (data && data.DESCRIPTION) {
    const splitted = data.DESCRIPTION.split(",");
    if (splitted.length === 2) {
      coords = {
        longitude: parseFloat(splitted[0]),
        latitude: parseFloat(splitted[1]),
      };
    }
  }
  const onLocationPress = ({ longitude, latitude }) => {
    setMaxValue("DESCRIPTION", longitude + "," + latitude);
  };
  console.log(data);

  return (
    <SimpleMap
      coords={coords}
      title={data && data.PONUM}
      description={data && data.VENDOR}
      onLocationPress={onLocationPress}
    />
  );
});
export default SimpleMapAdapter;
