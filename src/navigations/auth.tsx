import type { StackNavigationProp } from "@react-navigation/stack";
import type { NavigationProps } from "navigations";

import React from "react";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "contexts/auth";

import { AuthPrivacy, AuthTerm, Login, Name } from "screens/auth";

type AuthStackParamList = {
  AuthLogin: undefined;
  AuthPrivacy: undefined;
  AuthTerm: undefined;
  AuthName: undefined;
};
type AuthStackProps = StackNavigationProp<AuthStackParamList>;
const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  const { accessToken } = useAuth();

  const navigation = useNavigation<NavigationProps>();

  const stack = React.useMemo(() => {
    return accessToken ? "AuthPrivacy" : "AuthLogin";
  }, [accessToken]);
  const [currentStack, setCurrentStack] = React.useState(stack);

  React.useEffect(() => {
    const newStack = navigation.getState()?.routes[0].state?.routes[0].name;
    if (newStack) {
      setCurrentStack(newStack);
    }
  }, [navigation]);
  React.useEffect(() => {
    if (stack !== currentStack) {
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack", state: { routes: [{ name: stack }] } }],
      });
      setCurrentStack(stack);
    }
  }, [stack, currentStack, navigation]);

  return (
    <Stack.Navigator
      initialRouteName={stack}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthLogin" component={Login} />
      <Stack.Screen name="AuthPrivacy" component={AuthPrivacy} />
      <Stack.Screen name="AuthTerm" component={AuthTerm} />
      <Stack.Screen name="AuthName" component={Name} />
    </Stack.Navigator>
  );
};

export { AuthStack };
export type { AuthStackProps, AuthStackParamList };
