import type { ToastConfigParams } from "react-native-toast-message";

import React from "react";
import BootSplash from "react-native-bootsplash";
import ToastContainer from "react-native-toast-message";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Navigation } from "navigations";

import { useTheme } from "contexts/theme";

import { Toast } from "components/common";

const App = () => {
  const { colors, insets } = useTheme();

  const renderToast = ({
    type,
    props: { message, now },
  }: ToastConfigParams<{
    message: string;
    now: number;
  }>) => <Toast type={type} message={message} now={now} />;

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
        }}
        onReady={async () => {
          await BootSplash.hide({ fade: true });
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
          success: renderToast,
          error: renderToast,
        }}
      />
    </>
  );
};

export { App };
