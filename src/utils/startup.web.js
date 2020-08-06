import { prepareSQLDB, scriptRunner, setOfflineDetector } from "mplus-react";
import script from "../db.json";
import { Asset } from "expo-asset";

setOfflineDetector(() => {
  return Promise.resolve(true);
  //!!!!!!return true for the demo
});

prepareSQLDB(async db => {
  const preparedScript = script.filter(x => x != "COMMIT");
  return scriptRunner(db, preparedScript);
});
