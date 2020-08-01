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
import { showMessage, hideMessage } from "react-native-flash-message";
import { useSetOptions } from "../hooks";
import { Button } from "react-native-elements";
import { decode } from "base64-arraybuffer";
import { getDialogProps } from "../navigation/NavigationService";

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
  const photoUri = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [displayShootButton, setDisplayShootButton] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uploadReady, setUploadReady] = useState(false);
  //  const { container, uploadAction, takeAgain } = props.route.params["dialog"];
  const d = getDialogProps(props.route);
  const { container } = getDialogProps(props.route);
  useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      setCameraPermission(status === "granted")
    );
  }, []);

  const takeAgain = () => {
    setUploading(false);
    photoUri.current = null;
    setDisplayShootButton(true);
  };

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
        onPress={ev => {
          upload(photoUri.current);
        }}
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
    if (!photoUri.current) {
      alert("No photo yet taken");
      return;
    }

    let file = null;

    if (Platform.OS === "web") {
      const fileType = photoUri.current.match(/data:(.*);/)[1];
      const fileExtension = fileType.substr(fileType.lastIndexOf("/") + 1);
      const rawImageData = photoUri.current.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const arrayBuf = decode(rawImageData);
      const fileName = "IMG-" + new Date().valueOf() + "." + fileExtension;
      file = new File([arrayBuf], fileName, { type: fileType });
    } else {
      const fileName = photoUri.current.substr(
        photoUri.current.lastIndexOf("/") + 1
      );
      const fileType =
        "image/" + fileName.substr(fileName.lastIndexOf(".") + 1);
      file = {
        name: fileName,
        uri: photoUri.current,
        type: fileType
      };
    }
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
    photoUri.current = photo.uri;
    setDisplayShootButton(true);
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    if (photoUri.current) {
      return (
        <View style={{ flex: 1 }}>
          <Image style={{ flex: 1 }} source={{ uri: photoUri.current }} />
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
