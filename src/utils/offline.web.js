import { setOfflineDetector } from "mplus-react";

setOfflineDetector(() => {
  return Promise.resolve(!navigator.onLine);
});
