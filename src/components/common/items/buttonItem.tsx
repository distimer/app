import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { PhosphorIcon, type PhosphorIconName } from "../icon";
import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface ButtonItemProps {
  title: string;
  subtitle: string;
  leadingColor?: string;
  leadingIcon?: PhosphorIconName;
  trailingIcon?: PhosphorIconName;
  onPress?: () => void;
}
const ButtonItem: React.FC<ButtonItemProps> = ({
  title,
  subtitle,
  leadingColor,
  leadingIcon,
  trailingIcon,
  onPress,
}) => {
  const { colors, styles, values } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack align="center" gap={500} style={[styles.padding.horizontal[200]]}>
        {leadingColor && (
          <VStack
            style={[
              styles.radius.all[200],
              styles.$width(values[600]),
              styles.$height(values[600]),
              styles.$background(leadingColor),
            ]}
          />
        )}
        {leadingIcon && (
          <PhosphorIcon name={leadingIcon} color={colors.gray[700]} />
        )}
        <VStack gap={100} fill>
          <Text type="body" weight="semiBold" color={colors.gray[700]}>
            {title}
          </Text>
          <Text type="subheadline" weight="medium" color={colors.gray[500]}>
            {subtitle}
          </Text>
        </VStack>
        {trailingIcon && (
          <PhosphorIcon name={trailingIcon} color={colors.gray[400]} />
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export { ButtonItem };
