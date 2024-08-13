import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import React from "react";

import { deleteUser, putUser, useGetUser } from "api/endpoints/user/user";

import { useAuth } from "contexts/auth";
import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import {
  HStack,
  InputItem,
  RemoveButtonItem,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm } from "screens/sheets";

const EditProfile = () => {
  const { styles, colors } = useTheme();
  const { logout } = useAuth();
  const { startLoading, endLoading } = useLoading();

  const confirmSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetUser({
    query: {
      refetchOnMount: false,
    },
  });

  const [name, setName] = React.useState(data?.name || "");
  const [pass, setPass] = React.useState(false);

  const submit = async () => {
    startLoading();
    try {
      await putUser({
        name,
        terms_agreed: true,
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  const quit = async () => {
    startLoading();
    try {
      await deleteUser();
      await logout();
    } finally {
      endLoading();
    }
  };

  React.useEffect(() => {
    setName(data?.name || "");
  }, [data]);

  return (
    <Container
      title="프로필 설정"
      gap={800}
      backable
      scrollable
      button={{
        title: "변경사항 저장하기",
        disabled: !pass || name === data?.name,
        onPress: submit,
      }}>
      <HStack
        align="center"
        style={[
          styles.padding.vertical[500],
          styles.padding.horizontal[600],
          styles.radius.all[500],
          styles.$background(colors.gray[100]),
        ]}>
        <Wrapper
          data={data}
          skeleton={
            <Skeleton>
              <VStack gap={100}>
                <SkeletonText width={80} type="title3" weight="semiBold" />
                <SkeletonText width={160} type="subheadline" weight="medium" />
              </VStack>
            </Skeleton>
          }>
          {(data) => (
            <VStack gap={100}>
              <Text type="title3" weight="semiBold" color={colors.gray[800]}>
                {data.name}
              </Text>
              <Text type="subheadline" weight="medium" color={colors.gray[400]}>
                {
                  ["Apple로 로그인됨", "Google 계정으로 로그인됨"][
                    data.oauth_provider
                  ]
                }
              </Text>
            </VStack>
          )}
        </Wrapper>
      </HStack>
      <InputItem
        title="이름"
        icon="User"
        range={{
          min: 1,
          max: 20,
          pass,
          setPass,
        }}
        placeholder="이름을 입력해 주세요"
        value={name}
        setValue={setName}
      />
      <RemoveButtonItem
        title="회원 탈퇴"
        icon="UserMinus"
        onPress={() => {
          confirmSheetRef.current?.present();
        }}
      />
      <Confirm
        sheetRef={confirmSheetRef}
        title="정말로 탈퇴하시겠어요?"
        description="탈퇴하면 계정의 데이터가 모두 사라집니다."
        confirmText="탈퇴할게요"
        cancelText="계속 이용할게요"
        onConfirm={quit}
      />
    </Container>
  );
};

export { EditProfile };
