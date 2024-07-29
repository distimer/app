const hexOpacity = (hex: string, opacity: number) => {
  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return hex.length === 7 ? hex + opacityHex : hex.slice(0, 7) + opacityHex;
};

interface Colors {
  gray: {
    0: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  solid: {
    white: string;
    black: string;
    red: string;
    yellow: string;
    green: string;
    blue: string;
    purple: string;
  };
  social: {
    apple: {
      text: string;
      background: string;
    };
  };
}

const lightColors: Colors = {
  gray: {
    0: "#FFFFFF",
    100: "#F2F5F8",
    200: "#E5E9EE",
    300: "#CAD0D6",
    400: "#9CA1A9",
    500: "#5A5E63",
    600: "#404346",
    700: "#2E3234",
    800: "#232527",
    900: "#191B1C",
    1000: "#000000",
  },
  solid: {
    white: "#FFFFFF",
    black: "#000000",
    red: "#F93131",
    yellow: "#FFCC08",
    green: "#0FBD74",
    blue: "#3075F6",
    purple: "#8E4BF9",
  },
  social: {
    apple: {
      text: "#FFFFFF",
      background: "#000000",
    },
  },
};
const darkColors: Colors = {
  gray: {
    0: "#191B1C",
    100: "#232527",
    200: "#404346",
    300: "#5A5E63",
    400: "#9CA1A9",
    500: "#CAD0D6",
    600: "#E5E9EE",
    700: "#F2F5F8",
    800: "#FFFFFF",
    900: "#FFFFFF",
    1000: "#FFFFFF",
  },
  solid: {
    white: "#FFFFFF",
    black: "#000000",
    red: "#F93131",
    yellow: "#FFCC08",
    green: "#0FBD74",
    blue: "#3075F6",
    purple: "#8E4BF9",
  },
  social: {
    apple: {
      text: "#000000",
      background: "#FFFFFF",
    },
  },
};

export { lightColors, darkColors, hexOpacity };
export type { Colors };
