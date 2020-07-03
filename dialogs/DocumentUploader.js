import React, { PureComponent } from "react";
import { getDocumentAsync } from "expo-document-picker";
import { Button, ListItem, Icon } from "react-native-elements";
import { View, TouchableOpacity, FlatList } from "react-native";
import { closeDialog } from "../utils/utils";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { uploadFile, save } from "mplus-react";

export default class extends PureComponent {
  state = {
    files: []
  };
  static navigationOptions = ({ navigation }) => {
    const uploadDocuments = navigation.getParam("uploadDocuments");
    let buttonsData = [{ key: "close", label: "Close", action: closeDialog }];
    if (
      navigation.getParam("existFiles") &&
      !navigation.getParam("uploading")
    ) {
      buttonsData = [
        { key: "upload", label: "Upload", action: uploadDocuments },
        ...buttonsData
      ];
    }
    const icons = {
      upload: "md-cloud-upload"
    };
    const headerRightButtons = (
      <HeaderActionButtons buttons={buttonsData} icons={icons} />
    );
    return { headerTitle: "Upload Documents", headerRight: headerRightButtons };
  };
  fileKeyExtractor = (item, index) => item.uri;
  renderFileItem = ({ item, index }) => {
    const delAction = () => {
      let copiedState = [...this.state.files];
      copiedState.splice(index, 1);
      this.setState({ files: copiedState });
    };
    let iconName = this.state.uploading ? null : "md-trash";
    let fileAction = this.state.uploading ? null : delAction;
    let iconColor = null;
    if (item.status == "uploading") {
      iconName = "md-hourglass";
      fileAction = null;
    }
    if (item.status == "error") {
      iconName = "md-alert";
      fileAction = null;
      iconColor = "red";
    }
    if (item.status == "uploaded") {
      iconName = "md-checkmark-circle";
      fileAction = null;
      iconColor = "green";
    }
    const rightIcon = (
      <Icon
        name={iconName}
        type="ionicon"
        onPress={fileAction}
        color={iconColor}
      />
    );
    return <ListItem title={item.name} bottomDivider rightIcon={rightIcon} />;
  };
  render() {
    //    console.log("Uploading = " + this.state.uploading);
    return (
      <View>
        <FlatList
          data={this.state.files}
          renderItem={this.renderFileItem}
          keyExtractor={this.fileJeyExtractor}
        />
        {this.state.uploading ? null : (
          <Button onPress={this.readDocument} title="Choose a document" />
        )}
      </View>
    );
  }
  componentDidMount() {
    this.props.navigation.setParams({ uploadDocuments: this.uploadDocuments });
  }
  readDocument = async () => {
    const picked = await getDocumentAsync();
    if (picked.type != "cancel") {
      this.setState({ files: [...this.state.files, picked] });
      this.props.navigation.setParams({ existFiles: true });
    }
  };
  uploadDocuments = async () => {
    const { container, folder } = this.props.navigation.getParam("dialog");
    this.setState({ uploading: true });
    this.props.navigation.setParams({ uploading: true });
    const files = this.state.files;
    for (let j = 0; j < files.length; j++) {
      const fileItem = files[j];
      const file = {
        name: fileItem.name,
        uri: fileItem.uri,
        type: "application/octet-stream"
      };
      try {
        const newState = [...this.state.files];
        fileItem.status = "uploading";
        this.setState({ files: newState });
        const uploaded = await uploadFile(container, "doclinks", file, folder);
        fileItem.status = "uploaded";
      } catch (e) {
        fileItem.status = "error";
      }
      const newState = [...this.state.files];
      newState[j] = fileItem;
      this.setState({ files: newState });
      this.props.navigation.setParams({ uploading: false });
      save(container);
    }
    this.setState({ uploading: false });
  };
}
