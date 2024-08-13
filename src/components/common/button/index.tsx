import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { VStack } from "../stack";
import { Text } from "../text";

interface ButtonProps {
  children: string;
  disabled?: boolean;
  outline?: boolean;
  fill?: boolean;
  onPress?: () => void;
}
const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  outline,
  fill,
  onPress,
}) => {
  const { colors, styles } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.padding.vertical[500],
        styles.radius.all[400],
        styles.$background(disabled ? colors.gray[300] : colors.gray[900]),
        outline
          ? [
              styles.$background(colors.gray[0]),
              styles.$border(2, colors.gray[900]),
            ]
          : disabled
            ? [
                styles.$background(colors.gray[300]),
                styles.$border(2, colors.gray[300]),
              ]
            : [
                styles.$background(colors.gray[900]),
                styles.$border(2, colors.gray[900]),
              ],
        fill && styles.$flex(1),
      ]}
      disabled={disabled}
      onPress={onPress}>
      <VStack align="center" justify="center">
        <Text
          type="body"
          weight="semiBold"
          color={outline ? colors.gray[900] : colors.gray[0]}>
          {children}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};

export { Button };
