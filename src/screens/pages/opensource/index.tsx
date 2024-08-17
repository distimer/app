import React from "react";
import { Linking, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import licenses from "root/license.json";

import { useTheme } from "contexts/theme";

import { HStack, Text, VStack } from "components/common";
import { Container } from "components/layout";

const Opensource = () => {
  const { styles, colors } = useTheme();

  return (
    <Container title="오픈소스 라이선스" backable scrollable>
      <FlatList
        data={licenses}
        scrollEnabled={false}
        contentContainerStyle={[styles.gap.all[700]]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              await Linking.openURL(item.homepage);
            }}>
            <VStack style={[styles.padding.horizontal[200]]} gap={100}>
              <HStack align="center" justify="between">
                <Text
                  type="body"
                  weight="semiBold"
                  color={colors.gray[700]}
                  line={0}
                  style={[styles.$flex(1)]}>
                  {item.libraryName}
                </Text>
                <Text
                  type="subheadline"
                  weight="medium"
                  color={colors.solid.blue}>
                  {item._license}
                </Text>
              </HStack>
              <Text
                type="subheadline"
                weight="medium"
                color={colors.gray[700]}
                line={0}>
                {item._description}
              </Text>
            </VStack>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export { Opensource };
