import type { PhosphorIconName } from "../icon";

import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface CardItemProps {
  title: string;
  description: string;
  color?: string;
  selected?: boolean;
  onPress?: () => void;
  trailingIcon?: PhosphorIconName;
  trailingComponent?: React.ReactNode;
}
const CardItem: React.FC<CardItemProps> = ({
  title,
  description,
  color,
  selected,
  onPress,
  trailingComponent,
}) => {
  const { styles, colors, values } = useTheme();

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <HStack
        align="center"
        gap={400}
        style={[
          styles.padding.vertical[500],
          styles.padding.horizontal[600],
          styles.radius.all[500],
          styles.$background(colors.gray[100]),
          styles.$border(2, colors.gray[100]),
          selected && styles.$border(2, colors.gray[400]),
        ]}>
        {color && (
          <VStack
            style={[
              styles.radius.all[200],
              styles.$width(values[400]),
              styles.$height(values[400]),
              styles.$background(color),
            ]}
          />
        )}
        <VStack gap={100} fill>
          <Text type="title3" weight="semiBold" color={colors.gray[800]}>
            {title}
          </Text>
          <Text type="subheadline" weight="medium" color={colors.gray[400]}>
            {description}
          </Text>
        </VStack>
        {trailingComponent}
      </HStack>
    </TouchableOpacity>
  );
};

export { CardItem };
