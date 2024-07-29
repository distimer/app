import {
  AndroidError,
  AppleError,
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import { Icon, VStack } from "components/common";
import { LoginButton } from "components/features/auth";
import { useTheme } from "contexts/theme";
import { Platform } from "react-native";

const Login: React.FC = () => {
  const { colors, styles } = useTheme();

  const appleLogin = async () => {
    if (Platform.OS === "ios") {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        if (appleAuthRequestResponse.identityToken) {
          console.log(appleAuthRequestResponse.identityToken);
        }
      } catch (err) {
        console.error(err);
      }
    } else if (Platform.OS === "android") {
      appleAuthAndroid.configure({
        clientId: "api.distimer.com",
        redirectUri: "https://api.distimer.com/auth/callback/apple",
        scope: appleAuthAndroid.Scope.ALL,
        responseType: appleAuthAndroid.ResponseType.ID_TOKEN,
      });
      const response = await appleAuthAndroid.signIn();

      if (response.id_token) {
        console.log(response.id_token);
      }
    }
  };

  return (
    <VStack
      fill
      style={[
        styles.padding.horizontal[600],
        styles.safePadding.vertical[600],
        styles.$background(colors.gray[100]),
      ]}
    >
      <VStack align="center" justify="center" fill>
        <Icon name="OnboardingLogoIcon" fill={colors.gray[1000]} />
      </VStack>
      <VStack gap={400}>
        <LoginButton type="apple" onPress={appleLogin} />
        <LoginButton type="google" />
      </VStack>
    </VStack>
  );
};

export { Login };
