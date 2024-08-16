import React from "react";

import { useTheme } from "contexts/theme";

import { Text, VStack } from "components/common";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { colors, styles } = useTheme();

  return (
    <VStack
      gap={600}
      style={[
        styles.padding.all[600],
        styles.radius.all[500],
        styles.$background(colors.gray[100]),
      ]}>
      <Text type="subheadline" weight="medium" color={colors.gray[400]}>
        {title}
      </Text>
      {children}
    </VStack>
  );
};

export { Layout };
