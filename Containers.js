import React from "react";

import { AppContainer, SingleMboContainer, RelContainer } from "mplus-react";

// Put all the containers in this file
export default props => (
  <>
    <AppContainer
      id="pocont"
      mboname="po"
      appname="po"
      offlineenabled={false}
    />
  </>
);
