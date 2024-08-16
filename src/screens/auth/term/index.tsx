import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "navigations/auth";

import React from "react";
import { WebView } from "react-native-webview";

import { useTheme } from "contexts/theme";

import { Container } from "components/layout";

type Props = NativeStackScreenProps<AuthStackParamList, "AuthTerm">;
const Term: React.FC<Props> = ({ navigation }) => {
  const { styles, colors } = useTheme();

  return (
    <Container
      title="이용약관"
      dim
      backable
      button={{
        title: "이용약관 동의",
        onPress: () => {
          navigation.navigate("AuthName");
        },
      }}>
      <WebView
        source={{ uri: "https://term.distimer.com/" }}
        style={[
          styles.$flex(1),
          styles.radius.all[500],
          styles.$background(colors.gray[0]),
        ]}
      />
    </Container>
  );
};

export { Term };
