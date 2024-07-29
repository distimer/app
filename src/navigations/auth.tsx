import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { StackNavigationProp } from "@react-navigation/stack";

import { Login } from "screens/auth";

type AuthStackParamList = {
  AuthLogin: undefined;
  AuthPassword: undefined;
};
type AuthStackProps = StackNavigationProp<AuthStackParamList>;
const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthLogin" component={Login} />
    </Stack.Navigator>
  );
};

export { AuthStack };
export type { AuthStackProps, AuthStackParamList };
