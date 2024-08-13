import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { HStack, Icon, Text } from "components/common";

interface LoginButtonProps {
  type: "apple" | "google";
  onPress?: () => void;
}
const LoginButton: React.FC<LoginButtonProps> = ({ type, onPress }) => {
  const { colors, styles } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        gap={200}
        align="center"
        justify="center"
        style={[
          styles.padding.vertical[500],
          styles.radius.all[400],
          styles.$background(
            type === "apple"
              ? colors.social.apple.background
              : colors.solid.white,
          ),
        ]}>
        <Icon
          name={type === "apple" ? "SocialAppleIcon" : "SocialGoogleIcon"}
          fill={type === "apple" ? colors.social.apple.text : undefined}
        />
        <Text
          type="body"
          weight="semiBold"
          color={
            type === "apple" ? colors.social.apple.text : colors.solid.black
          }>
          {type === "apple" ? "Apple로 로그인" : "Google 계정으로 로그인"}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { LoginButton };
