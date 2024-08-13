import { StyleSheet } from "react-native";

import { values } from "./styles";
import { lineHeight } from "./texts";

const skeletonStyles = StyleSheet.create({
  button: {
    height: 62,
    borderRadius: values[400],
  },
  important: {
    height: lineHeight.important,
  },
  largeTitle: {
    height: lineHeight.largeTitle,
  },
  title1: {
    height: lineHeight.title1,
  },
  title2: {
    height: lineHeight.title2,
  },
  title3: {
    height: lineHeight.title3,
  },
  body: {
    height: lineHeight.body,
  },
  subheadline: {
    height: lineHeight.subheadline,
  },
  footnote: {
    height: lineHeight.footnote,
  },
  caption1: {
    height: lineHeight.caption1,
  },
  caption2: {
    height: lineHeight.caption2,
  },
});

export { skeletonStyles };
