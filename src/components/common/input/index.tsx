import React from "react";
import { TextInput } from "react-native";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { useTheme } from "contexts/theme";

import { textStyles, weightStyles } from "styles/texts";

import { VStack } from "../stack";

interface InputProps {
  size?: "big" | "small";
  type?: "text" | "search";
  align?: "left" | "center" | "right";
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  fill?: boolean;
  sheet?: boolean;
  forceValue?: boolean;
}
const Input: React.FC<InputProps> = ({
  size = "big",
  align = "left",
  value,
  setValue,
  placeholder,
  fill,
  sheet,
  forceValue = false,
}) => {
  const { colors, styles } = useTheme();

  const InputComponent = sheet ? BottomSheetTextInput : TextInput;

  return (
    <VStack
      style={[
        size === "big"
          ? [styles.radius.all[400], styles.$height(54)]
          : [styles.radius.all[300], styles.$height(44)],
        styles.$background(colors.gray[0]),
        styles.$border(1.5, colors.gray[300]),
      ]}
      fill={fill}>
      <InputComponent
        style={[
          size === "big"
            ? [
                textStyles.body,
                styles.padding.horizontal[600],
                {
                  lineHeight: 20,
                },
              ]
            : [
                textStyles.subheadline,
                styles.padding.horizontal[400],
                {
                  lineHeight: 18,
                },
              ],
          weightStyles.medium,
          styles.absoluteFill,
          {
            color: colors.gray[700],
            textAlign: align,
          },
        ]}
        autoCapitalize="none"
        value={!sheet || forceValue ? value : undefined}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[400]}
      />
    </VStack>
  );
};

export { Input };
export type { InputProps };
