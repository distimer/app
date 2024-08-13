import type { AlignItems, AlignSelf, JustifyContent } from "contexts/theme";
import type { StyleProp, ViewStyle } from "react-native";
import type { GapStyle } from "styles/styles";

import React from "react";
import { View } from "react-native";

import { useTheme } from "contexts/theme";

interface StackProps {
  children?: React.ReactNode;
  gap?: keyof GapStyle;
  align?: keyof AlignItems;
  justify?: keyof JustifyContent;
  self?: keyof AlignSelf;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  skeleton?: boolean;
}

interface StackBaseProps extends StackProps {
  direction: "row" | "column";
}
const StackBase: React.FC<StackBaseProps> = ({
  children,
  direction,
  gap = 0,
  align,
  justify,
  self,
  fill,
  style,
  skeleton,
}) => {
  const { styles } = useTheme();

  return (
    <View
      style={[
        styles.direction[direction],
        styles.gap.all[gap],
        align && styles.align[align],
        justify && styles.justify[justify],
        self && styles.self[self],
        fill && styles.$flex(1),
        style,
        skeleton && { backgroundColor: "green" },
      ]}>
      {children}
    </View>
  );
};

const HStack: React.FC<StackProps> = (props) => {
  return <StackBase direction="row" {...props} />;
};

const VStack: React.FC<StackProps> = (props) => {
  return <StackBase direction="column" {...props} />;
};

export { HStack, VStack };
