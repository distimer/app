import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { PhosphorIcon, type PhosphorIconName } from "../icon";
import { HStack } from "../stack";
import { Text } from "../text";

interface RemoveButtonItemProps {
  title: string;
  icon: PhosphorIconName;
  onPress?: () => void;
}
const RemoveButtonItem: React.FC<RemoveButtonItemProps> = ({
  title,
  icon,
  onPress,
}) => {
  const { colors, styles } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack align="center" gap={500} style={[styles.padding.all[200]]}>
        <PhosphorIcon name={icon} color={colors.solid.red} />
        <Text type="body" weight="semiBold" color={colors.solid.red}>
          {title}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { RemoveButtonItem };
