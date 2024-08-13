import type { NavbarStackParamList } from "./navbar";
import type { PagesStackParamList } from "./pages";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { NavigationProps } from "navigations";

import React from "react";

import {
  type NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useGetTimer } from "api/endpoints/timer/timer";

import { useAuth } from "contexts/auth";

import { Timer } from "screens/timer";

import { NavbarStack } from "./navbar";
import { PagesStack } from "./pages";

type MainStackParamList = {
  NavbarStack: NavigatorScreenParams<NavbarStackParamList>;
  PagesStack: NavigatorScreenParams<PagesStackParamList>;
  Timer: undefined;
};
type MainStackProps = StackNavigationProp<MainStackParamList>;
const Stack = createNativeStackNavigator<MainStackParamList>();
const MainStack = () => {
  const { accessToken } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  const { status } = useGetTimer({
    query: {
      refetchInterval: 5000,
    },
  });

  React.useEffect(() => {
    const current = navigation.getState()?.routes[0].state?.routes[0].name;
    if (current !== "Timer") {
      if (accessToken && status === "success") {
        navigation.reset({
          index: 0,
          routes: [
            { name: "MainStack", state: { routes: [{ name: "Timer" }] } },
          ],
        });
      }
    }
  }, [accessToken, status, navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NavbarStack" component={NavbarStack} />
      <Stack.Screen name="PagesStack" component={PagesStack} />
      <Stack.Screen name="Timer" component={Timer} />
    </Stack.Navigator>
  );
};

export { MainStack };
export type { MainStackProps, MainStackParamList };
