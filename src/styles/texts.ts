import { StyleSheet } from "react-native";

const fontSize = {
  important: 40,
  largeTitle: 34,
  title1: 28,
  title2: 22,
  title3: 20,
  body: 17,
  subheadline: 15,
  footnote: 13,
  caption1: 12,
  caption2: 11,
};
const lineHeight = {
  important: 48,
  largeTitle: 40,
  title1: 34,
  title2: 28,
  title3: 24,
  body: 22,
  subheadline: 20,
  footnote: 18,
  caption1: 16,
  caption2: 13,
};

const textStyles = StyleSheet.create({
  important: {
    fontSize: fontSize.important,
    lineHeight: lineHeight.important,
  },
  largeTitle: {
    fontSize: fontSize.largeTitle,
    lineHeight: lineHeight.largeTitle,
  },
  title1: {
    fontSize: fontSize.title1,
    lineHeight: lineHeight.title1,
  },
  title2: {
    fontSize: fontSize.title2,
    lineHeight: lineHeight.title2,
  },
  title3: {
    fontSize: fontSize.title3,
    lineHeight: lineHeight.title3,
  },
  body: {
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
  },
  subheadline: {
    fontSize: fontSize.subheadline,
    lineHeight: lineHeight.subheadline,
  },
  footnote: {
    fontSize: fontSize.footnote,
    lineHeight: lineHeight.footnote,
  },
  caption1: {
    fontSize: fontSize.caption1,
    lineHeight: lineHeight.caption1,
  },
  caption2: {
    fontSize: fontSize.caption2,
    lineHeight: lineHeight.caption2,
  },
});

const weightStyles = StyleSheet.create({
  regular: {
    fontFamily: "WantedSans-Regular",
  },
  medium: {
    fontFamily: "WantedSans-Medium",
  },
  semiBold: {
    fontFamily: "WantedSans-SemiBold",
  },
  bold: {
    fontFamily: "WantedSans-Bold",
  },
});

export { textStyles, weightStyles };
export { lineHeight };
