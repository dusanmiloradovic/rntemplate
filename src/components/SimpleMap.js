import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

export default (props) => {
  const [location, setLocation] = useState({ coords: {} });
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
      console.log(JSON.stringify(_location));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        onPress={(ev) => setMarketCoordinate(ev.nativeEvent.coordinate)}
        style={styles.map}
        region={{
          latitude: location.coords.latitude
            ? location.coords.latitude
            : 24.37278,
          longitude: location.coords.longitude
            ? location.coords.longitude
            : 54.68729,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {markerCoordinate ? (
          <MapView.Marker
            title="Go there"
            description="Hello!"
            coordinate={markerCoordinate}
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
