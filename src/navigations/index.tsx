import type { AuthStackParamList } from "./auth";
import type { MainStackParamList, MainStackProps } from "./main";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";
import { BackHandler } from "react-native";

import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "contexts/auth";

import { AuthStack } from "./auth";
import { MainStack } from "./main";

type NavigationParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};
type NavigationProps = StackNavigationProp<NavigationParamList>;
const Stack = createNativeStackNavigator<NavigationParamList>();
const Navigation = () => {
  const { dismiss } = useBottomSheetModal();

  const { accessToken } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  const stack = React.useMemo(() => {
    if (!accessToken) return "AuthStack";
    const termsAgreed = jwtDecode<{ terms_agreed: boolean }>(
      accessToken,
    ).terms_agreed;
    return termsAgreed ? "MainStack" : "AuthStack";
  }, [accessToken]);
  const [currentStack, setCurrentStack] = React.useState(stack);

  React.useEffect(() => {
    const newStack = navigation.getState()?.routes[0].name;
    if (newStack) {
      setCurrentStack(newStack);
    }
  }, [navigation]);
  React.useEffect(() => {
    if (stack !== currentStack) {
      navigation.reset({
        index: 0,
        routes: [{ name: stack }],
      });
      setCurrentStack(stack);
    }
  }, [stack, currentStack, navigation]);

  React.useEffect(() => {
    const backAction = () => {
      return dismiss();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [dismiss]);

  return (
    <Stack.Navigator
      initialRouteName={stack}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

const useMainNavigation = () => {
  const navigation = useNavigation<MainStackProps>();

  return navigation;
};

export { Navigation, useMainNavigation };
export type { NavigationProps, NavigationParamList };
