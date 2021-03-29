import "maximoplus-core-native";
import { SERVER_ROOT } from "@env";
import { setServerRoot } from "mplus-react";

console.log("maximoplus core native module loaded");
console.log("server root=" + SERVER_ROOT);
setServerRoot(SERVER_ROOT);

export const getServerRoot = () => SERVER_ROOT;
