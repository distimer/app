import React from "react";
import { Platform } from "react-native";

import {
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  postAuthOauthApple,
  postAuthOauthGoogle,
} from "api/endpoints/auth/auth";

import { useAuth } from "contexts/auth";
import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { Icon, VStack } from "components/common";
import { LoginButton } from "components/features/auth";

const Login: React.FC = () => {
  const { colors, styles } = useTheme();
  const { setTokens } = useAuth();
  const { startLoading, endLoading } = useLoading();

  const loginProcess = async (accessToken: string, refreshToken: string) => {
    console.log("check token");
    console.log(accessToken);
    await setTokens(accessToken, refreshToken);
  };

  const appleLoginProcess = async (token: string) => {
    const response = await postAuthOauthApple({
      token,
    });
    await loginProcess(response.access_token, response.refresh_token);
  };

  const googleLoginProcess = async (token: string) => {
    const response = await postAuthOauthGoogle({
      token,
    });
    await loginProcess(response.access_token, response.refresh_token);
  };

  const appleLogin = async () => {
    startLoading();
    if (Platform.OS === "ios") {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        if (appleAuthRequestResponse.identityToken) {
          await appleLoginProcess(appleAuthRequestResponse.identityToken);
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
        await appleLoginProcess(response.id_token);
      }
    }
    endLoading();
  };

  const googleLogin = async () => {
    startLoading();
    try {
      const { serverAuthCode } = await GoogleSignin.signIn();

      if (serverAuthCode) {
        await googleLoginProcess(serverAuthCode);
      }
    } catch (err) {
      console.error(err);
    }
    endLoading();
  };

  return (
    <VStack
      fill
      style={[
        styles.padding.horizontal[600],
        styles.safePadding.vertical[600],
        styles.$background(colors.gray[100]),
      ]}>
      <VStack align="center" justify="center" fill>
        <Icon name="OnboardingLogoIcon" fill={colors.gray[1000]} />
      </VStack>
      <VStack gap={400}>
        <LoginButton type="apple" onPress={appleLogin} />
        <LoginButton type="google" onPress={googleLogin} />
      </VStack>
    </VStack>
  );
};

export { Login };
