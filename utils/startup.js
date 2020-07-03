import { prepareSQLDB, scriptRunner, setOfflineDetector } from "mplus-react";
import { Asset } from "expo-asset";

//const script = require("../db.json");
/**
 * This script will run after boot.js. Put all the initializations here
 * One example will be the database preload:
 * const preparedScript = script.replace(/\n/g, "");
 * prepareSQLDB(db => {
 *  console.log("PREPARING THE DB");
 *  return scriptRunner(db, preparedScript); //it should return promise
 * });
 *
 */

console.log("running startup");

/**
 * This example will set the application in the offine mode, and then load the offline data
 * from the database script
 */

setOfflineDetector(() => {
  return Promise.resolve(false);
});

prepareSQLDB(async db => {
  //  const fileUri = Asset.fromModule(require("../db.sql")).uri;
  //  //  await fileUri.downloadAsync();
  //  let file = await fetch(fileUri);
  //
  //  let script = await file.text();
  //  console.log(script);
  //  const preparedScript = script.replace(/\n/g, "");
  //  console.log("PREPARING THE DB");
  //  return scriptRunner(db, preparedScript); //it should return promise
});
