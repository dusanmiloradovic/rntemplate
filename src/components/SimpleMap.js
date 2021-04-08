import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

export default ({ coords, title, description, onLocationPress }) => {
  const [location, setLocation] = useState(null);
  const [markerCoordinate, setMarketCoordinate] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let _location = await Location.getCurrentPositionAsync({});
      setLocation(_location);
    })();
  }, []);

  const effectiveCoords = coords ? coords : location && location.coords;
  const effectiveRegion = effectiveCoords
    ? {
        ...effectiveCoords,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    : null;
  return (
    <View style={styles.container}>
      <MapView
        onPress={(ev) => onLocationPress(ev.nativeEvent.coordinate)}
        style={styles.map}
        region={effectiveRegion}
      >
        {coords ? (
          <MapView.Marker
            title={title}
            description={description}
            coordinate={coords}
          />
        ) : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
