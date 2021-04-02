import React, { useState, useEffect } from "react";
import MaxList from "../../components/Mlist";
import { View, Image, Text, Linking, Platform } from "react-native";
import { RelContainer, getDownloadURL, getLocalValue } from "mplus-react";
import { closeDialog } from "../../utils/utils";
import { getServerRoot } from "../../utils/boot";
import { getDialogProps } from "../../navigation/NavigationService";
import { WebView } from "../../components/WebView";
import { Button, ListItem, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useSetOptions } from "../../hooks";

const platformPrefix = Platform.OS === "ios" ? "ios" : "md";

export default (props) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const openDocument = async () => {
    const maximoURL = await getLocalValue("doclinks", "urlname"); //TO find the file type
    const fileExt = maximoURL.substr(maximoURL.lastIndexOf(".") + 1);
    const _isImage =
      ["jpg", "JPG", "jpeg", "JPEF", "png", "PNG", "gif", "GIF"].indexOf(
        fileExt
      ) != -1;
    const isPdf = ["pdf", "PDF"].indexOf(fileExt) != -1;
    setIsImage(_isImage);
    if (Platform.OS === "web" || !isPdf) {
      const dlURL = await getDownloadURL("doclinks");
      setFile(dlURL);
    } else {
      const dlURL = await getDownloadURL("doclinks", "doclinksredirect");
      const newDLURL = await fetch(dlURL, { credentials: "include" });
      const dlTxt =
        getServerRoot() + "/" + (await newDLURL.text()) + "?ver=" + Date.now();
      Linking.openURL(dlTxt);
    }
  };
  useSetOptions({
    headerTitle: "Documents",
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
    file,
  });
  const { container } = getDialogProps(props.route);
  if (!container) {
    return (
      <View>
        <Text>No container specified for the dialog</Text>
      </View>
    );
  }

  let comp = null;
  if (file == null) {
    comp = (
      <MaxList
        listTemplate="doclinks"
        container="doclinks"
        norows={20}
        initdata={true}
        columns={[
          "document",
          "doctype",
          "description",
          "changeby",
          "changedate",
          "urlname",
        ]}
        selectableF={openDocument}
      />
    );
  } else {
    comp = <WebView source={{ uri: file }} />;
  }
  return (
    <>
      <RelContainer
        id="doclinks"
        container={container}
        relationship="doclinks"
      />
      {comp}
    </>
  );
};
