import React, { useEffect, useRef, useContext } from "react";
import { getSection, getQbeSection } from "mplus-react";
import { View, Text, ScrollView } from "react-native";
import TextField from "./section/TextField";
import Picker from "./section/Picker";
import { Button } from "react-native-elements";
//import { withNavigation } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavContext } from "../navigation/AppNavigator";
import { useSetOptions } from "../hooks/";
/**
 * Metadata type specifies the metadata for the component. The keys of the object are the column names in upper case, and the values are the object defined maps of metadata defined on the column.
 * @typedef {Object} Metadata
 * @example
 * {{
 *   SHIPVIA: {
 *     hasLookup: "true",
 *     listTemplate: "valuelist",
 *     filterTemplate: "valuelist"
 *   },
 *   "VENDOR.PHONE": { phonenum: true },
 *   REVCOMMENTS: { barcode: true, label: "Barcode test" }
 * }}
 */

/**
 * Section component properties
 * @typedef {Object} SectionProps
 * @property {string} container The id of the container
 * @property {Array} columns The columns displayed in the section
 * @property {Metadata} metadata The metadata of the columns
 */

/**
 * Section component
 * @class
 * @param {SectionProps} props
 * @example
 * <Section
 *   container="posingle"
 *   columns={[
 *     "ponum",
 *     "description",
 *     "status",
 *     "shipvia",
 *     "orderdate",
 *     "vendor",
 *     "vendor.phone",
 *     "revcomments"
 *   ]}
 *   metadata={{
 *     SHIPVIA: {
 *       hasLookup: "true",
 *       listTemplate: "valuelist",
 *       filterTemplate: "valuelist"
 *     },
 *     "VENDOR.PHONE": { phonenum: true },
 *     REVCOMMENTS: { barcode: true, label: "Barcode test" }
 *   }}
 * />
 */
const InnerSection = ({ flds }) => {
  useSetOptions({
    headerTitle: "EHEJ!!!",
    headerRight: () => (
      <View style={{ flexDirection: "row", marginRight: "5px" }}>
        <Button
          onPress={() => alert("This is a button!")}
          title="Info"
          color="#fff"
          type="clear"
          style={{ marginRight: "5px" }}
        />
        <Button
          onPress={() => alert("This is another button!")}
          title="Info2"
          color="#fff"
          type="clear"
        />
      </View>
    )
  });
  return <ScrollView style={{ marginTop: 15 }}>{flds}</ScrollView>;
};

//export const Section = getSection(TextField, Picker, flds => (
//  <ScrollView style={{ marginTop: 15 }}>{flds}</ScrollView>
//));

export const Section = getSection(TextField, Picker, flds => (
  <InnerSection flds={flds} />
));

/*
The purpose of this component is to set navigation properties "buttons"
the effect hook can be used just on the functional component like this, and thi
*/
const QbeSectionWrapper = props => {
  // const navigation = useNavigation();
  useSetOptions({ headerTitle: "QBE??" });
  return <ScrollView style={{ marginTop: 15 }}>{props.fields}</ScrollView>;
};

/**
 * QBE Section component properties
 * @typedef {Object} QbeSectionProps
 * @property {string} container The id of the container
 * @property {Array} columns The columns displayed in the section
 * @property {Metadata} metadata The metadata of the columns
 * @property {string} navigateTo The page to navigate to after the search is completed. If not specified, application navigates to the previous screen
 */

/**
 * QBE Section component - Maximo QBE search
 * @class
 * @param {QbeSectionProps} props
 * @example
 * <QbeSection
 *    container="pocont"
 *    columns={["ponum", "description", "status", "shipvia"]}
 *    navigateTo="POList"
 *    metadata={{
 *      SHIPVIA: {
 *        hasLookup: true,
 *        listTemplate: "qbevaluelist",
 *        filterTemplate: "qbevaluelist"
 *      },
 *      STATUS: {
 *        hasLookup: true,
 *        listTemplate: "qbevaluelist",
 *        filterTemplate: "qbevaluelist"
 *      }
 *    }}
 *  />
 */
export const QbeSection = getQbeSection(
  TextField,
  (fields, buttons, props) => {
    console.log(props);
    return <QbeSectionWrapper fields={fields} buttons={buttons} {...props} />;
  },
  (buttons, props) => {
    //    const navigation = useNavigation();
    const renderedButtons = buttons.map(b => {
      const action =
        b.key === "search"
          ? () => {
              if (props.navigateTo) {
                //                navigation.navigate(props.navigateTo);
              } else {
                //              navigation.goBack();
              }
              b.action();
            }
          : b.action;
      const type = b.key === "search" ? "solid" : "clear";
      return { label: b.label, key: b.key, action: action };
    });
    return renderedButtons;
  }
);
