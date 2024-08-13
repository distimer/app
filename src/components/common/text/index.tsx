import type { StyleProp, TextStyle } from "react-native";

import React from "react";
import { Text as RNText } from "react-native";

import { textStyles, weightStyles } from "styles/texts";

type TextType = keyof typeof textStyles;
type WeightType = keyof typeof weightStyles;
interface TextProps {
  children: React.ReactNode;
  type: TextType;
  weight: WeightType;
  color: string;
  align?: "left" | "center" | "right";
  line?: number;
  style?: StyleProp<TextStyle>;
}
const Text: React.FC<TextProps> = ({
  children,
  type,
  weight,
  color,
  align,
  line = 1,
  style,
}) => {
  return (
    <RNText
      style={[
        { includeFontPadding: false },
        textStyles[type],
        weightStyles[weight],
        { color },
        align && { textAlign: align },
        style,
      ]}
      numberOfLines={line}>
      {children}
    </RNText>
  );
};

interface SkeletonTextProps {
  type: TextType;
  weight: WeightType;
  width?: number;
  line?: number;
}
const SkeletonText: React.FC<SkeletonTextProps> = ({
  type,
  weight,
  width,
  line = 1,
}) => {
  return (
    <Text
      type={type}
      weight={weight}
      color="red"
      style={{
        width: width,
        backgroundColor: "blue",
      }}>
      {"a"}
      {"\n".repeat(line - 1)}
    </Text>
  );
};

export { Text, SkeletonText };
