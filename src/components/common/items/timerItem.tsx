import React from "react";

import { useTheme } from "contexts/theme";

import { PhosphorIcon } from "../icon";
import { HStack, VStack } from "../stack";
import { Text } from "../text";

interface TimerItemProps {
  title: string;
  description: string;
  color: string;
}
const TimerItem: React.FC<TimerItemProps> = ({ title, description, color }) => {
  const { styles, colors } = useTheme();

  return (
    <VStack
      gap={200}
      style={[
        styles.radius.all[600],
        styles.padding.vertical[500],
        styles.padding.horizontal[600],
        styles.$background(colors.gray[100]),
        styles.$border(2, color),
      ]}>
      <HStack align="center" gap={200}>
        <PhosphorIcon name="GraduationCap" color={color} />
        <Text type="title3" weight="semiBold" color={colors.gray[800]}>
          {title}
        </Text>
      </HStack>
      <Text type="body" weight="medium" color={colors.gray[500]}>
        {description}
      </Text>
    </VStack>
  );
};

export { TimerItem };
