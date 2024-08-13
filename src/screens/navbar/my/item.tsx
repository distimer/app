import type { PhosphorIconName } from "components/common";

import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { HStack, PhosphorIcon, Text } from "components/common";

interface ItemProps {
  children: string;
  icon: PhosphorIconName;
  color?: string;
  onPress?: () => void;
}
const Item: React.FC<ItemProps> = ({ children, icon, color, onPress }) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        align="center"
        gap={300}
        style={[
          styles.padding.vertical[500],
          styles.padding.horizontal[600],
          styles.radius.all[500],
          styles.$background(colors.gray[0]),
        ]}>
        <PhosphorIcon name={icon} color={color || colors.gray[700]} />
        <Text type="body" weight="medium" color={color || colors.gray[700]}>
          {children}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { Item };
