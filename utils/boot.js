import "maximoplus-core-native";
import { SERVER_ROOT } from "react-native-dotenv";
import { setServerRoot } from "mplus-react";

console.log("maximoplus core native module loaded");
console.log("server root=" + SERVER_ROOT);
setServerRoot(SERVER_ROOT);
