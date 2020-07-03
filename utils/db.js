import * as SQLite from "expo-sqlite";
import { DB_NAME } from "react-native-dotenv";
import { openOfflineErrors } from "../utils/utils";
import {
  setOfflineErrorsCb,
  prepareSQLDB,
  setSQLDBCallback
} from "mplus-react";

/**
 * The constant defines the name of the offline database. To avoid conflicts between different applications on the device, define the unique name for each. The .env file is the recommended location for that.
 * @constant
 */
const dbName = DB_NAME ? DB_NAME : "maximoplus";

setSQLDBCallback(() => {
  console.log("!!!!!!!!!!!!!!OPENING a db");
  return SQLite.openDatabase(dbName, "1.0", dbName, 20 * 1024 * 1024);
});

setOfflineErrorsCb(errors => {
  openOfflineErrors(errors);
});
