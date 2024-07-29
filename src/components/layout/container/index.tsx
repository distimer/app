import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { HStack, Icon, Text, VStack } from "components/common";
import { useTheme } from "contexts/theme";

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  background?: string;
}
const Container: React.FC<ContainerProps> = ({
  children,
  title,
  background,
}) => {
  const { styles, colors } = useTheme();

  return (
    <VStack
      style={[
        styles.safePadding.top[0],
        styles.$flex(1),
        background
          ? styles.$background(background)
          : styles.$background(colors.gray[0]),
      ]}
    >
      <HStack align="center" justify="between" style={[styles.$height(92)]}>
        <View style={[styles.$width(24), styles.$height(24)]} />
        {title ? (
          <Text type="title2" weight="semiBold" color={colors.gray[800]}>
            {title}
          </Text>
        ) : (
          <Icon name="HeaderLogoIcon" fill={colors.gray[1000]} />
        )}
        <View style={[styles.$width(24), styles.$height(24)]} />
      </HStack>
      <ScrollView>{children}</ScrollView>
    </VStack>
  );
};

export { Container };
