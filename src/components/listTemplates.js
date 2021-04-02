import React from "react";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";

export default {
  po: ({ DESCRIPTION, PONUM, STATUS }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{PONUM + " " + STATUS}</ListItem.Title>
        <ListItem.Subtitle>{DESCRIPTION}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ),
  valuelist: ({ VALUE, DESCRIPTION }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{DESCRIPTION}</ListItem.Title>
        <ListItem.Subtitle>{VALUE}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ),
  qbevaluelist: ({ VALUE, DESCRIPTION, _SELECTED }) => (
    <ListItem bottomDivider>
      {_SELECTED === "Y" ? <Icon name="check" type="font-awesome" /> : null}
      <ListItem.Content>
        <ListItem.Title>{DESCRIPTION}</ListItem.Title>
        <ListItem.Subtitle>{VALUE}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ),
  personlist: ({ PERSONID, DISPLAYNAME }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{PERSONID}</ListItem.Title>
        <ListItem.Subtitle>{DISPLAYNAME}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ),
  doclinks: ({ DESCRIPTION, DOCTYPE, URLNAME }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{DESCRIPTION}</ListItem.Title>
        <ListItem.Subtitle>{DOCTYPE}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ),

  offlineErrors: ({ data, message }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{data.PONUM}</ListItem.Title>
        <ListItem.Subtitle>{message}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  ),
};
