import type { StyleProp, TextStyle } from "react-native";
import { Text as RNText } from "react-native";

import { textStyles, weightStyles } from "styles/texts";

type TextType = keyof typeof textStyles;
type WeightType = keyof typeof weightStyles;
interface TextProps {
  children: React.ReactNode;
  type: TextType;
  weight: WeightType;
  color: string;
  align?: "left" | "center" | "right";
  line?: number;
  style?: StyleProp<TextStyle>;
}
const Text: React.FC<TextProps> = ({
  children,
  type,
  weight,
  color,
  align,
  line,
  style,
}) => {
  return (
    <RNText
      style={[
        { includeFontPadding: false },
        textStyles[type],
        weightStyles[weight],
        { color },
        align && { textAlign: align },
        style,
      ]}
      numberOfLines={line}
    >
      {children}
    </RNText>
  );
};

export { Text };
