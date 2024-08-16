import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "navigations/auth";

import React from "react";
import { WebView } from "react-native-webview";

import { useTheme } from "contexts/theme";

import { Container } from "components/layout";

type Props = NativeStackScreenProps<AuthStackParamList, "AuthPrivacy">;
const AuthPrivacy: React.FC<Props> = ({ navigation }) => {
  const { styles, colors } = useTheme();

  return (
    <Container
      title="개인정보처리방침"
      dim
      button={{
        title: "개인정보처리방침 동의",
        onPress: () => {
          navigation.navigate("AuthTerm");
        },
      }}>
      <WebView
        source={{ uri: "https://privacy.distimer.com/" }}
        style={[
          styles.$flex(1),
          styles.radius.all[500],
          styles.$background(colors.gray[0]),
        ]}
      />
    </Container>
  );
};

export { AuthPrivacy };
