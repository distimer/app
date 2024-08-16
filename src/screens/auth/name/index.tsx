import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "navigations/auth";

import React from "react";

import { useTheme } from "contexts/theme";

import { HStack, Input, PhosphorIcon, Text, VStack } from "components/common";
import { Container } from "components/layout";

type Props = NativeStackScreenProps<AuthStackParamList, "AuthName">;
const Name: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();

  const [name, setName] = React.useState("");

  const ok = React.useMemo(() => {
    return name.length >= 1 && name.length <= 20;
  }, [name]);

  return (
    <Container
      title="사용자 이름 설정"
      dim
      backable
      button={{
        title: "다음",
        disabled: !ok,
        onPress: () => {
          navigation.navigate("AuthSuggestion", { name });
        },
      }}>
      <VStack justify="center" gap={400} fill>
        <VStack gap={300}>
          <Text type="subheadline" weight="medium" color={colors.gray[700]}>
            이름
          </Text>
          <Input
            value={name}
            setValue={setName}
            placeholder="이름을 입력해 주세요"
          />
        </VStack>
        <HStack align="center" gap={100}>
          <PhosphorIcon
            name="Check"
            size={20}
            color={ok ? colors.solid.green : colors.gray[500]}
          />
          <Text
            type="body"
            weight="medium"
            color={ok ? colors.solid.green : colors.gray[500]}>
            사용자 이름은 1~20자로 설정해 주세요.
          </Text>
        </HStack>
      </VStack>
    </Container>
  );
};

export { Name };
