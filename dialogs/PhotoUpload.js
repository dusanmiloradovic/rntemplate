import React, { PureComponent, createRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { closeDialog } from "../utils/utils";
import { uploadFile, save } from "mplus-react";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { showMessage, hideMessage } from "react-native-flash-message";

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

export default class extends PureComponent {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    displayShootButton: true, //once the picture is taken disable before going to upload screen
    uploading: false,
    photoUri: null
  };

  static navigationOptions = ({ navigation }) => {
    const upload = navigation.getParam("upload", false);
    const uploadAction = navigation.getParam("uploadAction");
    const flip = navigation.getParam("flip");
    const takeAgain = navigation.getParam("takeAgain");
    const backButton = (
      <HeaderActionButtons
        buttons={[{ key: "close", label: "Back", action: closeDialog }]}
        icons={{ close: "md-arrow-back" }}
        style={{ color: "white" }}
      />
    );

    const rightButtons = upload
      ? [
          {
            key: "upload",
            label: "Upload",
            action: uploadAction
          },
          {
            key: "shootAgain",
            label: "Shoot Again",
            action: takeAgain
          }
        ]
      : [
          {
            key: "reverseCamera",
            label: "Camera Reverse",
            action: flip
          }
        ];
    const icons = {
      reverseCamera: "md-reverse-camera",
      shootAgain: "md-camera",
      upload: "md-cloud-upload"
    };

    const headerRightButtons = (
      <HeaderActionButtons
        buttons={rightButtons}
        icons={icons}
        style={{ color: "white" }}
      />
    );

    return upload
      ? {
          headerTitle: (
            <Text style={{ color: "white", fontSize: 18 }}>Upload</Text>
          ),
          headerTransparent: true,
          headerLeft: backButton,
          headerStyle: { borderBottomWidth: 0 },
          headerRight: headerRightButtons
        }
      : {
          headerTitle: (
            <Text style={{ color: "white", fontSize: 18 }}>Take Picture</Text>
          ),
          headerLeft: backButton,
          headerTransparent: true,
          headerStyle: { borderBottomWidth: 0 },
          headerRight: headerRightButtons
        };
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      uploadAction: this.upload,
      takeAgain: this.takeAgain,
      flip: this.flip
    });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takeAgain = () => {
    this.props.navigation.setParams({ upload: false });
    this.setState({ photoUri: null, displayShootButton: true });
  };

  upload = () => {
    const { container } = this.props.navigation.getParam("dialog");
    const fileName = this.state.photoUri.substr(
      this.state.photoUri.lastIndexOf("/") + 1
    );
    const file = {
      name: fileName,
      uri: this.state.photoUri,
      type: "image/jpeg"
    };
    this.setState({ uploading: true });
    uploadFile(container, "doclinks", file, "Photos")
      .then(() => {
        save(container);
        this.setState({ uploading: false });
        showMessage("Photo uploaded");
        closeDialog();
      })
      .catch(err => {
        this.setState({ uploading: false });
        alert(err);
      });
  };

  flip = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
      this.setState({ displayShootButton: false });
    }
  };

  onPictureSaved = async photo => {
    this.props.navigation.setParams({ upload: true });
    this.setState({ photoUri: photo.uri, displaySHootBUtton: true });
  };

  render() {
    const { hasCameraPermission, type } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      if (this.state.photoUri) {
        return (
          <View style={{ flex: 1 }}>
            <Image style={{ flex: 1 }} source={{ uri: this.state.photoUri }} />
            {this.state.uploading && (
              <View style={styles.uploading}>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        );
      }
      const shootButton = this.state.displayShootButton ? (
        <TouchableOpacity
          style={{
            flex: 1,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={this.takePicture}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
            <Ionicons name="ios-radio-button-on" size={70} color="white" />
          </Text>
        </TouchableOpacity>
      ) : null;

      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={ref => {
              this.camera = ref;
            }}
          >
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
  }
}
