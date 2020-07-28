import React, {
  PureComponent,
  createRef,
  useState,
  useEffect,
  useRef
} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { closeDialog } from "../utils/utils";
import { uploadFile, save } from "mplus-react";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useSetOptions } from "../hooks";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  uploading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  }
});

export default props => {
  const CameraRef = useRef();
  const takePicture = () => {
    console.log("taking the picture");
    console.log(CameraRef.current);
    if (CameraRef.current) {
      CameraRef.current.takePictureAsync({
        onPictureSaved
      });
      setDisplayShootButton(false);
      setUploadReady(true);
    }
  };
  const platformPrefix = Platform.OS === "ios" ? "ios" : "md";
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [displayShootButton, setDisplayShootButton] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uploadReady, setUploadReady] = useState(false);
  const { container, uploadAction, takeAgain } = props.route.params["dialog"];
  useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      setCameraPermission(status === "granted")
    );
  }, []);

  const backButton = () => (
    <Button
      color="#fff"
      onPress={closeDialog}
      type="clear"
      style={{ marginRight: 5 }}
      icon={
        <Ionicons
          style={{ padding: 3 }}
          name={platformPrefix + "-arrow-back"}
          color="white"
          size={24}
        />
      }
    />
  );

  const headerRightButtons = () => (
    <View style={{ flexDirection: "row", marginRight: 5 }}>
      <Button
        key="upload"
        color="white"
        type="clear"
        style={{ marginRight: 5 }}
        onPress={uploadAction}
        icon={
          <Ionicons
            style={{ padding: 3 }}
            size={24}
            color="white"
            name={platformPrefix + "-cloud-upload"}
          />
        }
      />
      <Button
        key="shootagain"
        color="white"
        type="clear"
        style={{ marginRight: 5 }}
        onPress={takeAgain}
        icon={
          <Ionicons
            style={{ padding: 3 }}
            size={24}
            color="white"
            name={platformPrefix + "-camera"}
          />
        }
      />
      <Button
        key="reversecamera"
        color="white"
        type="clear"
        style={{ marginRight: 5 }}
        onPress={flip}
        icon={
          <Ionicons
            style={{ padding: 3 }}
            size={24}
            color="white"
            name={platformPrefix + "-reverse-camera"}
          />
        }
      />
    </View>
  );

  useSetOptions({
    headerTitle: uploadReady ? (
      <Text style={{ color: "white", fontSize: 18 }}>Upload</Text>
    ) : (
      <Text style={{ color: "white", fontSize: 18 }}>Take Picture</Text>
    ),
    headerTransparent: true,
    headerLeft: backButton,
    headerStyle: { borderBottomWidth: 0 },
    headerRight: headerRightButtons
  });
  const upload = () => {
    const fileName = photoUri.substr(photoUri.lastIndexOf("/") + 1);
    const file = {
      name: fileName,
      uri: photoUri,
      type: "image/jpeg"
    };
    setUploading(true);

    uploadFile(container, "doclinks", file, "Photos")
      .then(() => {
        save(container);
        setUploading(false);
        showMessage("Photo uploaded");
        closeDialog();
      })
      .catch(err => {
        setUploading(false);
        alert(err);
      });
  };

  const flip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onPictureSaved = async photo => {
    console.log("on picture saved");
    setPhotoUri(photo.uri);
    setDisplayShootButton(true);
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    if (photoUri) {
      console.log(photoUri);
      return (
        <View style={{ flex: 1 }}>
          <Image style={{ flex: 1 }} source={{ uri: photoUri }} />
          {uploading && (
            <View style={styles.uploading}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      );
    }
    const shootButton = displayShootButton ? (
      <TouchableOpacity
        style={{
          flex: 1,
          alignSelf: "flex-end",
          alignItems: "center"
        }}
        onPress={takePicture}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </Text>
      </TouchableOpacity>
    ) : null;

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={CameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            {shootButton}
          </View>
        </Camera>
      </View>
    );
  }
};
