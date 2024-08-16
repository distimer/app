import React from "react";
import { TouchableOpacity } from "react-native";
import { getVersion } from "react-native-device-info";

import { useMainNavigation } from "navigations";

import { useTheme } from "contexts/theme";

import { HStack, Icon, Text, VStack } from "components/common";
import { Container } from "components/layout";

const AppInfo = () => {
  const navigation = useMainNavigation();

  const { styles, colors } = useTheme();

  return (
    <Container title="앱 정보" backable>
      <VStack align="center" justify="center" gap={800} fill>
        <VStack align="center" gap={400}>
          <VStack
            style={[
              styles.$background(colors.gray[900]),
              {
                borderRadius: 22,
              },
            ]}>
            <Icon name="AppLogo96" fill={colors.gray[0]} />
          </VStack>
          <VStack align="center" gap={100}>
            <Text type="title1" weight="semiBold" color={colors.gray[800]}>
              DISTIMER
            </Text>
            <Text type="body" weight="medium" color={colors.gray[400]}>
              버전 {getVersion()}
            </Text>
          </VStack>
        </VStack>
        <VStack align="center" gap={200}>
          <Text type="subheadline" weight="medium" color={colors.gray[500]}>
            제작
          </Text>
          <VStack align="end" gap={100}>
            <Person name="이진서" role="Design" />
            <Person name="박성민" role="App" />
            <Person name="정선우" role="Backend" />
          </VStack>
        </VStack>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PagesStack", {
              screen: "Opensource",
            });
          }}>
          <Text type="subheadline" weight="medium" color={colors.gray[500]}>
            오픈소스 라이선스 보기
          </Text>
        </TouchableOpacity>
      </VStack>
    </Container>
  );
};

interface PersonProps {
  name: string;
  role: string;
}
const Person: React.FC<PersonProps> = ({ name, role }) => {
  const { colors } = useTheme();

  return (
    <HStack gap={200}>
      <Text type="subheadline" weight="medium" color={colors.gray[400]}>
        {role}
      </Text>
      <Text type="subheadline" weight="medium" color={colors.gray[700]}>
        {name}
      </Text>
    </HStack>
  );
};

export { AppInfo };
