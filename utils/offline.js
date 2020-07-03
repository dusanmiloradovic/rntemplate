import { NetInfo } from "react-native";
import { setOfflineDetector } from "mplus-react";

setOfflineDetector(() => {
  return NetInfo.getConnectionInfo().then(connectionInfo => {
    if (connectionInfo.type === "none" || connectionInfo.type === "unknown") {
      return true;
    }
    return false;
  });
});
