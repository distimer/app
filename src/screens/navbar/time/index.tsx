import { Text } from "react-native";

import { Container } from "components/layout";
import { useTheme } from "contexts/theme";

const Time: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container background={colors.gray[100]}>
      <Text>Time</Text>
    </Container>
  );
};

export { Time };
