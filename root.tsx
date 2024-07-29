import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "contexts/theme";

import { App } from "./src";

LogBox.ignoreLogs([
  "None of the callbacks in the gesture are worklets.",
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "[Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.",
  "[Reanimated] Reduced motion setting is enabled on this device.",
]);

const Root = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ThemeProvider>
          <BottomSheetModalProvider>
            <App />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export { Root };
