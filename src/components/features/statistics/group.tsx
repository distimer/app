import React from "react";
import { FlatList } from "react-native-gesture-handler";

import { useTheme } from "contexts/theme";

import { consume } from "utils/func";

import { HStack, Text, VStack } from "components/common";

interface GroupProps {
  title: string;
  data: {
    id: string;
    name: string;
    color?: string;
    total: number;
  }[];
}
const Group: React.FC<GroupProps> = ({ title, data }) => {
  const { styles, colors, values } = useTheme();

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
      <FlatList
        data={data}
        scrollEnabled={false}
        contentContainerStyle={[styles.gap.all[400]]}
        renderItem={({ item }) => (
          <VStack gap={100}>
            <HStack align="center" gap={200}>
              <Text type="body" weight="medium" color={colors.gray[700]}>
                {item.name}
              </Text>
              <Text type="subheadline" weight="medium" color={colors.gray[400]}>
                {consume(item.total)}{" "}
              </Text>
            </HStack>
            <VStack
              style={[
                styles.radius.all[100],
                styles.$height(values[200]),
                styles.$background(item.color || colors.gray[400]),
                {
                  minWidth: values[200],
                  width: `${(item.total / data[0].total) * 100}%`,
                },
              ]}
            />
          </VStack>
        )}
      />
    </VStack>
  );
};

export { Group };
