import React from "react";

import { useTheme } from "contexts/theme";

import { PhosphorIcon } from "../icon";
import { VStack } from "../stack";
import { Text } from "../text";

interface EmptyProps {
  children: string;
}
const Empty: React.FC<EmptyProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <VStack align="center" gap={100}>
      <PhosphorIcon name="XCircle" color={colors.gray[400]} />
      <Text type="body" weight="medium" color={colors.gray[400]}>
        {children}
      </Text>
    </VStack>
  );
};

export { Empty };
