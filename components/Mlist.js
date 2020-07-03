import React, { useState, PureComponent } from "react";
import { getSimpleList } from "mplus-react";
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import listTemplates from "./listTemplates";
import { useNavigation } from "@react-navigation/native";

const MPListItem = props => {
  const navigation = useNavigation();
  const ListTemplate = listTemplates[props.listTemplate];
  const _onPress = () => {
    props.rowAction(props.mxrow);
    //props.navigation.navigate("Details");
    if (props.navigate) {
      props.navigate(navigation);
    }
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <ListTemplate {...props.data} />
    </TouchableOpacity>
  );
};

const MPList = props => {
  const [fetching, setFetching] = useState(null); //to prevent from excessive fetching

  const FooterWait = () => {
    return props.waiting ? (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      ListFooterComponent={FooterWait}
      data={props.data}
      renderItem={({ item }) => (
        <MPListItem
          {...item}
          listTemplate={props.listTemplate}
          navigate={props.navigate}
        />
      )}
      onEndReached={ev => {
        //        console.log("end reached");
        requestAnimationFrame(_ => {
          if (fetching === null) {
            //initially don't fetch more, this is triggered even first time on render
            setFetching(false);
            return;
          } else {
            if (!fetching) {
              setFetching(true);
              props.fetchMore(5);
              setTimeout(() => {
                setFetching(false);
              }, 500);
            }
          }
        });
      }}
      keyExtractor={item => item.key.toString()}
    />
  );
};

/**
 * List properties parameter
 * @typedef {Object} ListProps
 * @property {string} container The id of the container
 * @property {string} listTemplate Defines the template for the flat list item. The template is the function that gets the Maximo data and returns one row of the list. The data coming from Maximo is the object with the column names as keys. The special key _SELECTED designates the record in MboSet is selected.
 * @property {Array} columns The columns to be displayed in the list
 * @property {number} norows Initial number of rows displayed in the list
 * @property {boolean} initdata If true, fetch the data automatically.
 * @property {Function} selectableF When the user tap on the list item, the system moves the current MboSet row. After that, the action specified in selectableF is executed. Usually, that is the function that navigates to the other screen of the application
 * @example
 * listTemplate example:
 *   qbevaluelist: ({ VALUE, DESCRIPTION, _SELECTED }) => (
 *    <ListItem
 *      title={VALUE}
 *      subtitle={DESCRIPTION}
 *      leftIcon={
 *        _SELECTED === "Y" ? <Icon name="check" type="font-awesome" /> : null
 *      }
 *    />
 *  )
 */

/**
& React Native FlatList implementation of the MaximoPlus List.
& By default, the system implements infinite scrolling.
* @class List
* @param {ListProps} props
* @example
* <List
*   listTemplate="po"
*   container="pocont"
*   columns={["ponum", "description", "status"]}
*   selectableF={_ => NavigationService.navigate("POSection")}
*   norows={20}
*   initdata={true}
* />
*/
export default getSimpleList(MPList);
