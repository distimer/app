import type { EdgeInsets } from "react-native-safe-area-context";
import type { Colors } from "styles/colors";
import type {
  BorderRadiusStyle,
  BorderRadiusStyleKeys,
  BorderRadiusStyles,
  GapStyle,
  GapStyles,
  Keys,
  PaddingStyle,
  PaddingStyleKeys,
  PaddingStyles,
} from "styles/styles";

import React from "react";
import { Appearance, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { darkColors, lightColors } from "styles/colors";
import {
  borderRadiusTypes,
  gapTypes,
  paddingTypes,
  values,
} from "styles/styles";

const position = {
  absolute: { position: "absolute" },
  relative: { position: "relative" },
} as const;
type Position = typeof position;
const overflow = {
  hidden: { overflow: "hidden" },
  visible: { overflow: "visible" },
} as const;
type Overflow = typeof overflow;
const flexDirection = {
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
} as const;
type FlexDirection = typeof flexDirection;
const alignSelf = {
  center: { alignSelf: "center" },
  start: { alignSelf: "flex-start" },
  end: { alignSelf: "flex-end" },
  stretch: { alignSelf: "stretch" },
} as const;
type AlignSelf = typeof alignSelf;
const alignItems = {
  center: { alignItems: "center" },
  start: { alignItems: "flex-start" },
  end: { alignItems: "flex-end" },
  stretch: { alignItems: "stretch" },
} as const;
type AlignItems = typeof alignItems;
const justifyContent = {
  center: { justifyContent: "center" },
  start: { justifyContent: "flex-start" },
  end: { justifyContent: "flex-end" },
  around: { justifyContent: "space-around" },
  between: { justifyContent: "space-between" },
} as const;
type JustifyContent = typeof justifyContent;

type Scheme = "light" | "dark";
type Styles = {
  padding: PaddingStyles;
  safePadding: PaddingStyles;
  gap: GapStyles;
  radius: BorderRadiusStyles;
  position: Position;
  overflow: Overflow;
  direction: FlexDirection;
  self: AlignSelf;
  align: AlignItems;
  justify: JustifyContent;
  absoluteFill: typeof StyleSheet.absoluteFill;
  $index: (zIndex: number) => { zIndex: number };
  $top: (top: number) => { top: number };
  $right: (right: number) => { right: number };
  $bottom: (bottom: number) => { bottom: number };
  $left: (left: number) => { left: number };
  $width: (width: number) => { width: number };
  $height: (height: number) => { height: number };
  $flex: (flex: number) => { flex: number };
  $grow: (flexGrow: number) => { flexGrow: number };
  $background: (color: string) => { backgroundColor: string };
  $border: (
    width: number,
    color: string,
  ) => { borderWidth: number; borderColor: string };
  $padding: (value: number) => { padding: number };
  $paddingTop: (value: number) => { paddingTop: number };
  $paddingRight: (value: number) => { paddingRight: number };
  $paddingBottom: (value: number) => { paddingBottom: number };
  $paddingLeft: (value: number) => { paddingLeft: number };
  $paddingVertical: (value: number) => {
    paddingTop: number;
    paddingBottom: number;
  };
  $paddingHorizontal: (value: number) => {
    paddingLeft: number;
    paddingRight: number;
  };
  $margin: (value: number) => { margin: number };
  $marginTop: (value: number) => { marginTop: number };
  $marginRight: (value: number) => { marginRight: number };
  $marginBottom: (value: number) => { marginBottom: number };
  $marginLeft: (value: number) => { marginLeft: number };
  $marginVertical: (value: number) => {
    marginTop: number;
    marginBottom: number;
  };
  $marginHorizontal: (value: number) => {
    marginLeft: number;
    marginRight: number;
  };
};
type Values = typeof values;

const ThemeContext = React.createContext<{
  scheme: Scheme;
  colors: Colors;
  styles: Styles;
  insets: EdgeInsets;
  values: Values;
  screen: { width: number; height: number };
}>({
  scheme: "light",
  colors: lightColors,
  styles: {} as Styles,
  insets: { top: 0, right: 0, bottom: 0, left: 0 },
  values: values,
  screen: { width: 0, height: 0 },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const insets = useSafeAreaInsets();

  const [screen, setScreen] = React.useState({ width: 0, height: 0 });
  const [scheme, setScheme] = React.useState<Scheme>(
    Appearance.getColorScheme() || "light",
  );

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setScheme(colorScheme || "light");
    });

    return () => subscription.remove();
  }, []);

  const colors = React.useMemo(() => {
    return scheme === "dark" ? darkColors : lightColors;
  }, [scheme]);

  const styles: Styles = React.useMemo(() => {
    const paddingStyles = paddingTypes.reduce((acc, type) => {
      acc[type] = Object.entries(values).reduce((a, [key, value]) => {
        a[key as unknown as Keys] = {
          [`padding${type !== "all" ? type.charAt(0).toUpperCase() + type.slice(1) : ""}`]:
            value,
        };
        return a;
      }, {} as PaddingStyle);
      return acc;
    }, {} as PaddingStyles);

    const safePaddingStyles = paddingTypes.reduce((acc, type) => {
      acc[type] = Object.entries(values).reduce((a, [key, value]) => {
        let style: PaddingStyleKeys;
        switch (type) {
          case "all":
            style = {
              paddingTop: value + insets.top,
              paddingRight: value + insets.right,
              paddingBottom: value + insets.bottom,
              paddingLeft: value + insets.left,
            };
            break;
          case "top":
            style = {
              paddingTop: value + insets.top,
            };
            break;
          case "bottom":
            style = {
              paddingBottom: value + insets.bottom,
            };
            break;
          case "left":
            style = {
              paddingLeft: value + insets.left,
            };
            break;
          case "right":
            style = {
              paddingRight: value + insets.right,
            };
            break;
          case "vertical":
            style = {
              paddingTop: value + insets.top,
              paddingBottom: value + insets.bottom,
            };
            break;
          case "horizontal":
            style = {
              paddingLeft: value + insets.left,
              paddingRight: value + insets.right,
            };
            break;
        }
        a[key as unknown as Keys] = style;
        return a;
      }, {} as PaddingStyle);
      return acc;
    }, {} as PaddingStyles);

    const gapStyles = gapTypes.reduce((acc, type) => {
      acc[type] = Object.entries(values).reduce((a, [key, value]) => {
        a[key as unknown as Keys] = {
          [`${type === "all" ? "" : type}${type === "all" ? "gap" : "Gap"}`]:
            value,
        };
        return a;
      }, {} as GapStyle);
      return acc;
    }, {} as GapStyles);

    const borderRadiusStyles = borderRadiusTypes.reduce((acc, type) => {
      acc[type] = Object.entries(values).reduce((a, [key, value]) => {
        let style: BorderRadiusStyleKeys;
        switch (type) {
          case "all":
            style = {
              borderRadius: value,
            };
            break;
          case "top":
            style = {
              borderTopLeftRadius: value,
              borderTopRightRadius: value,
            };
            break;
          case "bottom":
            style = {
              borderBottomLeftRadius: value,
              borderBottomRightRadius: value,
            };
            break;
          case "left":
            style = {
              borderTopLeftRadius: value,
              borderBottomLeftRadius: value,
            };
            break;
          case "right":
            style = {
              borderTopRightRadius: value,
              borderBottomRightRadius: value,
            };
            break;
        }
        a[key as unknown as Keys] = style;
        return a;
      }, {} as BorderRadiusStyle);
      return acc;
    }, {} as BorderRadiusStyles);

    return {
      padding: paddingStyles,
      safePadding: safePaddingStyles,
      gap: gapStyles,
      radius: borderRadiusStyles,
      position,
      overflow,
      direction: flexDirection,
      self: alignSelf,
      align: alignItems,
      justify: justifyContent,
      absoluteFill: StyleSheet.absoluteFill,
      $index: (zIndex) => ({
        zIndex,
      }),
      $top: (top) => ({
        top,
      }),
      $right: (right) => ({
        right,
      }),
      $bottom: (bottom) => ({
        bottom,
      }),
      $left: (left) => ({
        left,
      }),
      $width: (width) => ({
        width,
      }),
      $height: (height) => ({
        height,
      }),
      $flex: (flex) => ({
        flex,
      }),
      $grow: (flexGrow) => ({
        flexGrow,
      }),
      $background: (color) => ({
        backgroundColor: color,
      }),
      $border: (width, color) => ({
        borderWidth: width,
        borderColor: color,
      }),
      $padding: (value) => ({
        padding: value,
      }),
      $paddingTop: (value) => ({
        paddingTop: value,
      }),
      $paddingRight: (value) => ({
        paddingRight: value,
      }),
      $paddingBottom: (value) => ({
        paddingBottom: value,
      }),
      $paddingLeft: (value) => ({
        paddingLeft: value,
      }),
      $paddingVertical: (value) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      $paddingHorizontal: (value) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      $margin: (value) => ({
        margin: value,
      }),
      $marginTop: (value) => ({
        marginTop: value,
      }),
      $marginRight: (value) => ({
        marginRight: value,
      }),
      $marginBottom: (value) => ({
        marginBottom: value,
      }),
      $marginLeft: (value) => ({
        marginLeft: value,
      }),
      $marginVertical: (value) => ({
        marginTop: value,
        marginBottom: value,
      }),
      $marginHorizontal: (value) => ({
        marginLeft: value,
        marginRight: value,
      }),
    };
  }, [insets]);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setScreen({ width, height });
      }}>
      <ThemeContext.Provider
        value={{
          scheme,
          colors,
          styles,
          insets,
          values,
          screen,
        }}>
        {screen.width > 0 && screen.height > 0 ? children : null}
      </ThemeContext.Provider>
    </View>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
export type { AlignItems, JustifyContent, AlignSelf };
