import { Icon, VStack } from "components/common";
import { LoginButton } from "components/features/auth";
import { useTheme } from "contexts/theme";

const Login: React.FC = () => {
  const { colors, styles } = useTheme();

  return (
    <VStack
      fill
      style={[
        styles.padding.horizontal[600],
        styles.safePadding.vertical[600],
        styles.$background(colors.gray[100]),
      ]}
    >
      <VStack align="center" justify="center" fill>
        <Icon name="OnboardingLogoIcon" fill={colors.gray[1000]} />
      </VStack>
      <VStack gap={400}>
        <LoginButton type="apple" />
        <LoginButton type="google" />
      </VStack>
    </VStack>
  );
};

export { Login };
