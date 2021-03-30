import "maximoplus-core";
import { setServerRoot } from "mplus-react";

console.log("maximoplus web core library loaded");
//.dotenv doesn't work for react native web, we have to manually set the server root here

export const serverRoot = "http://192.168.0.146:9009";
setServerRoot(serverRoot);

export const getServerRoot = () => serverRoot;
