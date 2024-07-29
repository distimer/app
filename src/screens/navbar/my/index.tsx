import { Text } from "react-native";

import { Container } from "components/layout";
import { useTheme } from "contexts/theme";

const My: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container background={colors.gray[100]}>
      <Text>My</Text>
    </Container>
  );
};

export { My };
