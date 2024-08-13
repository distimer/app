import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface LoadingProps {
  startLoading: () => void;
  endLoading: () => void;
}
const LoadingContext = React.createContext<LoadingProps>({} as LoadingProps);
const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(false);
  const opacity = useSharedValue(0);

  const startLoading = React.useCallback(() => {
    setLoading(true);
    opacity.value = withTiming(1, { duration: 100 });
  }, [opacity]);
  const endLoading = React.useCallback(() => {
    opacity.value = withTiming(0, { duration: 100 });
    setTimeout(() => setLoading(false), 100);
  }, [opacity]);

  return (
    <LoadingContext.Provider value={{ startLoading, endLoading }}>
      {children}
      {loading && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity,
            },
          ]}>
          <ActivityIndicator size="large" />
        </Animated.View>
      )}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useLoading };
