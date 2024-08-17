import type { ToastType } from "react-native-toast-message";

import React from "react";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { useTheme } from "contexts/theme";

import { PhosphorIcon } from "../icon";
import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface ToastProps {
  type: ToastType;
  message: string;
  now: number;
}
const Toast: React.FC<ToastProps> = ({ type, message, now }) => {
  const { styles, colors } = useTheme();

  React.useEffect(() => {
    if (!message) return;
    if (type === "error") {
      ReactNativeHapticFeedback.trigger("notificationError");
    } else {
      ReactNativeHapticFeedback.trigger("notificationSuccess");
    }
  }, [type, message, now]);

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
        <PhosphorIcon
          name={type === "error" ? "WarningCircle" : "CheckCircle"}
          color={colors.gray[400]}
        />
        <Text type="subheadline" weight="medium" color={colors.gray[700]}>
          {message}
        </Text>
      </HStack>
    </VStack>
  );
};

export { Toast };
