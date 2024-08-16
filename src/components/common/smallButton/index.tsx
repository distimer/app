import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { VStack } from "../stack";
import { Text } from "../text";

interface SmallButtonProps {
  children: string;
  size?: "big" | "small";
  selected?: boolean;
  onPress?: () => void;
}
const SmallButton: React.FC<SmallButtonProps> = ({
  children,
  size = "small",
  selected,
  onPress,
}) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <VStack
        align="center"
        justify="center"
        style={[
          size === "big"
            ? [
                styles.padding.vertical[200],
                styles.padding.horizontal[400],
                styles.radius.all[300],
              ]
            : [
                styles.padding.vertical[100],
                styles.padding.horizontal[200],
                styles.radius.all[250],
              ],
          selected && styles.$background(colors.gray[500]),
          selected
            ? size === "big"
              ? [styles.$border(1.5, colors.gray[500])]
              : [styles.$border(1, colors.gray[500])]
            : size === "big"
              ? [styles.$border(1.5, colors.gray[400])]
              : [styles.$border(1, colors.gray[400])],
        ]}>
        <Text
          type={size === "big" ? "body" : "subheadline"}
          weight={selected ? "semiBold" : "medium"}
          color={selected ? colors.gray[0] : colors.gray[400]}>
          {children}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};

export { SmallButton };
