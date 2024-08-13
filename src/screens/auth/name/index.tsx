import React from "react";

import { putUser } from "api/endpoints/user/user";

import { useAuth } from "contexts/auth";
import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { HStack, Input, PhosphorIcon, Text, VStack } from "components/common";
import { Container } from "components/layout";

const Name: React.FC = () => {
  const { colors } = useTheme();
  const { refresh } = useAuth();
  const { startLoading, endLoading } = useLoading();

  const [name, setName] = React.useState("");

  const ok = React.useMemo(() => {
    return name.length >= 1 && name.length <= 20;
  }, [name]);

  const submit = async () => {
    if (ok) {
      startLoading();
      try {
        await putUser({
          name,
          terms_agreed: true,
        });
        await refresh();
      } finally {
        endLoading();
      }
    }
  };

  return (
    <Container
      title="사용자 이름 설정"
      dim
      button={{
        title: "다음",
        disabled: !ok,
        onPress: submit,
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
