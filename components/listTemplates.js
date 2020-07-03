import React from "react";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";

export default {
  po: ({ DESCRIPTION, PONUM, STATUS }) => (
    <ListItem title={DESCRIPTION} subtitle={PONUM + " " + STATUS} />
  ),
  valuelist: ({ VALUE, DESCRIPTION }) => (
    <ListItem title={VALUE} subtitle={DESCRIPTION} />
  ),
  qbevaluelist: ({ VALUE, DESCRIPTION, _SELECTED }) => (
    <ListItem
      title={VALUE}
      subtitle={DESCRIPTION}
      leftIcon={
        _SELECTED === "Y" ? <Icon name="check" type="font-awesome" /> : null
      }
    />
  ),
  personlist: ({ PERSONID, DISPLAYNAME }) => (
    <ListItem title={PERSONID} subtitle={DISPLAYNAME} />
  ),
  doclinks: ({ DESCRIPTION, DOCTYPE, URLNAME }) => (
    <ListItem title={DESCRIPTION} subtitle={DOCTYPE} />
  ),
  po: ({ DESCRIPTION, PONUM, STATUS }) => (
    <ListItem title={DESCRIPTION} subtitle={PONUM + " " + STATUS} />
  ),
  offlineErrors: ({ data, message }) => (
    <ListItem title={data.PONUM} subtitle={message} />
  )
};
