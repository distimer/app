import React from "react";

import { useTheme } from "contexts/theme";

import { consume } from "utils/func";

import { HStack, Text, VStack } from "components/common";

import { Layout } from "./layout";

interface OverviewProps {
  title: string;
  total: number;
  leftTitle: string;
  rightTitle: string;
  leftValue: number;
  rightValue: number;
}
const Overview: React.FC<OverviewProps> = ({
  title,
  total,
  leftTitle,
  rightTitle,
  leftValue,
  rightValue,
}) => {
  const { colors } = useTheme();

  return (
    <Layout title={title}>
      <VStack align="center" gap={100}>
        <Text type="subheadline" weight="medium" color={colors.gray[400]}>
          공부한 시간
        </Text>
        <Text type="title1" weight="semiBold" color={colors.gray[800]}>
          {consume(total)}
        </Text>
      </VStack>
      <HStack>
        <Item title={leftTitle} value={leftValue} />
        <Item title={rightTitle} value={rightValue} />
      </HStack>
    </Layout>
  );
};

interface ItemProps {
  title: string;
  value: number;
}
const Item: React.FC<ItemProps> = ({ title, value }) => {
  const { colors } = useTheme();

  return (
    <VStack align="center" gap={100} fill>
      <Text type="subheadline" weight="medium" color={colors.gray[400]}>
        {title}
      </Text>
      <Text type="title3" weight="medium" color={colors.gray[700]}>
        {consume(value)}
      </Text>
    </VStack>
  );
};

export { Overview };
