import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "navigations/auth";

import React from "react";
import { ScrollView } from "react-native-gesture-handler";

import { useTheme } from "contexts/theme";

import { Text } from "components/common";
import { Container } from "components/layout";

type Props = NativeStackScreenProps<AuthStackParamList, "AuthAgreement">;
const Agreement: React.FC<Props> = ({ navigation }) => {
  const { styles, colors } = useTheme();

  return (
    <Container
      title="이용약관"
      dim
      button={{
        title: "약관 동의 및 진행하기",
        onPress: () => {
          navigation.navigate("AuthName");
        },
      }}>
      <ScrollView
        style={[styles.radius.all[500], styles.$background(colors.gray[0])]}
        contentContainerStyle={[styles.padding.all[600]]}>
        <Text type="footnote" weight="medium" color={colors.gray[700]}>
          머시기 약관
        </Text>
      </ScrollView>
    </Container>
  );
};

export { Agreement };
