import React from "react";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";

export default {
  po: ({ DESCRIPTION, PONUM, STATUS }) => (
    <ListItem bottomDivider>
      <ListItem.Title>{DESCRIPTION}</ListItem.Title>
      <ListItem.Subtitle>{PONUM + " " + STATUS}</ListItem.Subtitle>
    </ListItem>
  ),
  valuelist: ({ VALUE, DESCRIPTION }) => (
    <ListItem bottomDivider>
      <ListItem.Title>{DESCRIPTION}</ListItem.Title>
      <ListItem.Subtitle>{VALUE}</ListItem.Subtitle>
    </ListItem>
  ),
  qbevaluelist: ({ VALUE, DESCRIPTION, _SELECTED }) => (
    <ListItem bottomDivider>
      {_SELECTED === "Y" ? <Icon name="check" type="font-awesome" /> : null}
      <ListItem.Title>{DESCRIPTION}</ListItem.Title>
      <ListItem.Subtitle>{VALUE}</ListItem.Subtitle>
    </ListItem>
  ),
  personlist: ({ PERSONID, DISPLAYNAME }) => (
    <ListItem bottomDivider>
      <ListItem.Title>{PERSONID}</ListItem.Title>
      <ListItem.Subtitle>{DISPLAYNAME}</ListItem.Subtitle>
    </ListItem>
  ),
  doclinks: ({ DESCRIPTION, DOCTYPE, URLNAME }) => (
    <ListItem bottomDivider>
      <ListItem.Title>{DESCRIPTION}</ListItem.Title>
      <ListItem.Subtitle>{DOCTYPE}</ListItem.Subtitle>
    </ListItem>
  ),

  offlineErrors: ({ data, message }) => (
    <ListItem bottomDivider>
      <ListItem.Title>{data.PONUM}</ListItem.Title>
      <ListItem.Subtitle>{message}</ListItem.Subtitle>
    </ListItem>
  ),
};
