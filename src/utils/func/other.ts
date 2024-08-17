import codePush from "react-native-code-push";
import { getVersion } from "react-native-device-info";

export const getAppVersion = async () => {
  const version = getVersion();
  const update = await codePush.getUpdateMetadata();

  if (!update) {
    return `${version}`;
  }

  const label = update.label.substring(1);
  return `${version} (${label})`;
};
