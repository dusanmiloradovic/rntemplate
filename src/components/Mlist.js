import React from "react";
import { getSimpleList } from "mplus-react";
import MPList from "./list/MPList";

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
