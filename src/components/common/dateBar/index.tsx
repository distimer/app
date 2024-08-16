import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { PhosphorIcon } from "../icon";
import { HStack } from "../stack";
import { Text } from "../text";

interface DateBarProps {
  title: string;
  onLeft: () => void;
  onCenter: () => void;
  onRight: () => void;
}
const DateBar: React.FC<DateBarProps> = ({
  title,
  onLeft,
  onCenter,
  onRight,
}) => {
  const { colors, values } = useTheme();

  return (
    <HStack align="center" justify="center" gap={400}>
      <TouchableOpacity hitSlop={values[200]} onPress={onLeft}>
        <PhosphorIcon name="ArrowCircleLeft" color={colors.gray[400]} />
      </TouchableOpacity>
      <TouchableOpacity hitSlop={values[200]} onPress={onCenter}>
        <Text type="title3" weight="semiBold" color={colors.gray[700]}>
          {title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity hitSlop={values[200]} onPress={onRight}>
        <PhosphorIcon name="ArrowCircleRight" color={colors.gray[400]} />
      </TouchableOpacity>
    </HStack>
  );
};

export { DateBar };
