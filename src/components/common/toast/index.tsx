import React from "react";

import { useTheme } from "contexts/theme";

import { PhosphorIcon } from "../icon";
import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface ToastProps {
  message: string;
}
const Toast: React.FC<ToastProps> = ({ message }) => {
  const { styles, colors } = useTheme();

  return (
    <VStack self="stretch" style={[styles.padding.all[600]]}>
      <HStack
        align="center"
        justify="center"
        gap={300}
        style={[
          styles.radius.all[1000],
          styles.$height(48),
          styles.$background(colors.gray[200]),
        ]}>
        <PhosphorIcon name="WarningCircle" color={colors.gray[400]} />
        <Text type="subheadline" weight="medium" color={colors.gray[700]}>
          {message}
        </Text>
      </HStack>
    </VStack>
  );
};

export { Toast };
