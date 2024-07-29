import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Root } from "./root";

AppRegistry.registerComponent(appName, () => Root);
