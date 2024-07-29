const values = {
  "-1000": -64,
  "-900": -48,
  "-800": -32,
  "-700": -28,
  "-600": -24,
  "-500": -20,
  "-400": -16,
  "-300": -12,
  "-200": -8,
  "-100": -4,
  "-50": -2,
  0: 0,
  50: 2,
  100: 4,
  200: 8,
  300: 12,
  400: 16,
  500: 20,
  600: 24,
  700: 28,
  800: 32,
  900: 48,
  1000: 64,
} as const;
type Keys = keyof typeof values;

const paddingStyleKeys = [
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingVertical",
  "paddingHorizontal",
] as const;
type PaddingStyleKeys = {
  [key in (typeof paddingStyleKeys)[number]]?: number;
};
type PaddingStyle = {
  [key in Keys]: PaddingStyleKeys;
};
const paddingTypes = [
  "all",
  "top",
  "bottom",
  "left",
  "right",
  "vertical",
  "horizontal",
] as const;
type PaddingStyles = {
  [key in (typeof paddingTypes)[number]]: PaddingStyle;
};

const gapStyleKeys = ["gap", "rowGap", "columnGap"] as const;
type GapStyleKeys = {
  [key in (typeof gapStyleKeys)[number]]?: number;
};
type GapStyle = {
  [key in Keys]: GapStyleKeys;
};
const gapTypes = ["all", "row", "column"] as const;
type GapStyles = {
  [key in (typeof gapTypes)[number]]: GapStyle;
};

const borderRadiusStyleKeys = [
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
] as const;
type BorderRadiusStyleKeys = {
  [key in (typeof borderRadiusStyleKeys)[number]]?: number;
};
type BorderRadiusStyle = {
  [key in Keys]: BorderRadiusStyleKeys;
};
const borderRadiusTypes = ["all", "top", "bottom", "left", "right"] as const;
type BorderRadiusStyles = {
  [key in (typeof borderRadiusTypes)[number]]: BorderRadiusStyle;
};

export { values };
export type { Keys };

export { paddingTypes };
export type { PaddingStyleKeys, PaddingStyle, PaddingStyles };
export { gapTypes };
export type { GapStyle, GapStyles };
export { borderRadiusTypes };
export type { BorderRadiusStyleKeys, BorderRadiusStyle, BorderRadiusStyles };
