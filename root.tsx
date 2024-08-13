import React from "react";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "contexts/auth";
import { LoadingProvider } from "contexts/loading";
import { ThemeProvider } from "contexts/theme";

import { ENV } from "./env";
import { App } from "./src";

LogBox.ignoreLogs([
  "None of the callbacks in the gesture are worklets.",
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.",
  "[Reanimated] Reduced motion setting is enabled on this device.",
  "Interceptor",
  "Possible unhandled promise rejection",
]);

const queryClient = new QueryClient({
  defaultOptions: {},
});

const Root = () => {
  GoogleSignin.configure({
    webClientId: ENV.googleClientId,
    offlineAccess: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <ThemeProvider>
            <LoadingProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </LoadingProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export { Root };
