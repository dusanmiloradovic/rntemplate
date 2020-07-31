import React, { PureComponent } from "react";
import MaxList from "../components/Mlist";
import { View, Image, Text, WebView, Linking } from "react-native";
import { RelContainer, getDownloadURL, getLocalValue } from "mplus-react";
import PDFReader from "rn-pdf-reader-js";
import HeaderActionButtons from "../components/HeaderActionButtons";
import { closeDialog } from "../utils/utils";
import { SERVER_ROOT } from "react-native-dotenv";
import { getDialogProps } from "../navigation/NavigationService";

export default class extends PureComponent {
  state = { file: null, fileType: null, isImage: false, isPdf: false };
  static navigationOptions = ({ navigation }) => {
    const buttonsData = [{ key: "close", label: "Close", action: closeDialog }];
    const headerRightButtons = <HeaderActionButtons buttons={buttonsData} />;
    return {
      headerTitle: "View Attachments",
      headerRight: headerRightButtons
    };
  };
  render() {
    const { container } = getDialogProps(this.props.route);
    let ret = null;
    if (this.state.file == null) {
      ret = (
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
            "urlname"
          ]}
          selectableF={this.openDocument}
        />
      );
    } else {
      ret = (
        <WebView source={{ uri: this.state.file }} style={{ marginTop: 20 }} />
      );
      if (this.state.isImage) {
        ret = (
          <View style={{ flex: 1 }}>
            <Image style={{ flex: 1 }} source={{ uri: this.state.file }} />
          </View>
        );
      }
      if (this.state.isPdf) {
        ret = (
          <View stylestyle={{ flex: 1 }}>
            <PDFReader
              source={{
                uri: "http://www.africau.edu/images/default/sample.pdf"
              }}
            />
          </View>
        );
      }
    }
    return (
      <>
        <RelContainer
          id="doclinks"
          container={container}
          relationship="doclinks"
        />
        {ret}
      </>
    );
  }
  openDocument = async () => {
    const maximoURL = await getLocalValue("doclinks", "urlname"); //TO find the file type
    const fileExt = maximoURL.substr(maximoURL.lastIndexOf(".") + 1);
    const isImage =
      ["jpg", "JPG", "jpeg", "JPEF", "png", "PNG", "gif", "GIF"].indexOf(
        fileExt
      ) != -1;
    const isPdf = ["pdf", "PDF"].indexOf(fileExt) != -1;
    const dlURL = await getDownloadURL("doclinks", "doclinksredirect");
    const newDLURL = await fetch(dlURL, { credentials: "include" });
    const dlTxt =
      SERVER_ROOT + "/" + (await newDLURL.text()) + "?ver=" + Date.now();
    if (isPdf) {
      Linking.openURL(dlTxt);
    } else {
      this.setState({ isImage, isPdf, file: dlTxt });
    }
  };
}
