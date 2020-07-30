import React, { useState, useRef, useContext, useEffect } from "react";
import { getDocumentAsync } from "expo-document-picker";
import { Button, ListItem, Icon } from "react-native-elements";
import { View, TouchableOpacity, FlatList, Platform } from "react-native";
import { closeDialog } from "../utils/utils";

import { uploadFile, save } from "mplus-react";
import { useSetOptions } from "../hooks";
import { Ionicons } from "@expo/vector-icons";
import StackNavContext from "../navigation/StackNavContext";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

export default props => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const existFiles = useRef(false);
  const { setOptions } = useContext(StackNavContext);
  const firstRun = useRef(true);

  const uf = () => {
    setOptions({
      headerTitle: "Upload Documents",
      headerLeft: () => (
        <Button
          color="#fff"
          onPress={closeDialog}
          type="clear"
          style={{ marginRight: 5 }}
          icon={
            <Ionicons
              style={{ padding: 3 }}
              name={platformPrefix + "-arrow-back"}
              size={24}
            />
          }
        />
      ),
      headerRight: () =>
        files.length > 0 ? (
          <Button
            key="upload"
            type="clear"
            style={{ marginRight: 5 }}
            onPress={uploadDocuments}
            icon={
              <Ionicons
                style={{ padding: 3 }}
                size={24}
                name={platformPrefix + "-cloud-upload"}
              />
            }
          />
        ) : null
    });
  };
  useEffect(uf, [files]);

  setTimeout(() => {
    if (firstRun.current) {
      firstRun.current = false;
      uf();
    }
  }, 0);

  const uploadDocuments = async () => {
    const { container, folder } = props.route.params["dialog"];
    setUploading(true);
    for (let j = 0; j < files.length; j++) {
      const fileItem = files[j];
      const file =
        Platform.OS == "web"
          ? fileItem.file
          : {
              name: fileItem.name,
              uri: fileItem.uri,
              type: "application/octet-stream"
            };
      try {
        fileItem.status = "uploading";
        const uploaded = await uploadFile(container, "doclinks", file, folder);
        fileItem.status = "uploaded";
      } catch (e) {
        fileItem.status = "error";
      }
      const newFiles = [...files];
      newFiles[j] = fileItem;
      setFiles(newFiles);

      save(container);
    }
    setUploading(false);
  };

  const fileKeyExtractor = (item, index) => item.uri;

  const renderFileItem = ({ item, index }) => {
    const delAction = () => {
      let copiedState = [...files];
      copiedState.splice(index, 1);
      setFiles(copiedState);
    };
    let iconName = uploading ? null : "md-trash";
    let fileAction = uploading ? null : delAction;
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

  const readDocument = async () => {
    const picked = await getDocumentAsync();
    if (picked.type != "cancel") {
      setFiles([...files, picked]);
    }
  };
  return (
    <View>
      <FlatList
        data={files}
        renderItem={renderFileItem}
        keyExtractor={fileKeyExtractor}
      />
      {uploading ? null : (
        <Button onPress={readDocument} title="Choose a document" />
      )}
    </View>
  );
};
