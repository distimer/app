import React from "react";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import ToastContainer from "react-native-toast-message";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Navigation } from "navigations";

import { useTheme } from "contexts/theme";

import { Toast } from "components/common";

const App = () => {
  const { colors, insets } = useTheme();

  const renderErrorToast = ({
    props,
  }: {
    props: {
      message: string;
    };
  }) => <Toast {...props} />;

  return (
    <>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.gray[0],
            text: colors.gray[700],
          },
        }}>
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
      </NavigationContainer>
      <ToastContainer
        position="top"
        visibilityTime={3000}
        topOffset={insets.top}
        config={{
          error: renderErrorToast,
        }}
        onShow={() => {
          ReactNativeHapticFeedback.trigger("notificationError", {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
        }}
      />
    </>
  );
};

export { App };
