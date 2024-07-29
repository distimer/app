import type { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { StackNavigationProp } from "@react-navigation/stack";

import type { AuthStackParamList } from "./auth";
import { AuthStack } from "./auth";
import type { NavbarStackParamList } from "./navbar";
import { NavbarStack } from "./navbar";

type NavigationParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  NavbarStack: NavigatorScreenParams<NavbarStackParamList>;
};
type NavigationProps = StackNavigationProp<NavigationParamList>;
const Stack = createNativeStackNavigator<NavigationParamList>();
const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="NavbarStack" component={NavbarStack} />
    </Stack.Navigator>
  );
};

export { Navigation };
export type { NavigationProps, NavigationParamList };
