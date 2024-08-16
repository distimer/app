import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  deleteGroupMemberGroupIDMemberID,
  putGroupMemberGroupIDMemberID,
  useGetGroupMemberId,
} from "api/endpoints/group/group";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { CardItem, InputItem, RadioItem, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm } from "screens/sheets";

const EditUser = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "EditUser">>();
  const navigation = useNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetGroupMemberId(params.group);

  const user = React.useMemo(() => {
    if (!data) return undefined;
    return data.find((member) => member.user_id === params.user);
  }, [data, params.user]);

  const [nickname, setNickname] = React.useState("");
  const [pass, setPass] = React.useState(false);
  const [role, setRole] = React.useState(0);

  React.useEffect(() => {
    if (!user) return;
    setNickname(user.nickname);
    setRole(user.role);
  }, [user]);

  const isChanged = React.useMemo(() => {
    if (!user) return false;
    return user.nickname !== nickname || user.role !== role;
  }, [user, nickname, role]);

  const submit = async () => {
    startLoading();
    try {
      await putGroupMemberGroupIDMemberID(params.group, params.user, {
        nickname,
        role,
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  const remove = async () => {
    startLoading();
    try {
      await deleteGroupMemberGroupIDMemberID(params.group, params.user);
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="유저 정보 수정"
      backable
      scrollable
      trailingIcon={{
        name: "Gavel",
        color: colors.solid.red,
        onPress: () => {
          sheetRef.current?.present();
        },
      }}
      button={{
        title: "변경사항 저장하기",
        disabled: !isChanged || !pass,
        onPress: submit,
      }}>
      <Wrapper data={user}>
        {(user) => (
          <VStack gap={800}>
            <CardItem
              title={user.nickname}
              description={["맴버", "매니저"][user.role]}
            />
            <InputItem
              title="닉네임"
              icon="IdentificationBadge"
              range={{
                min: 1,
                max: 20,
                pass,
                setPass,
              }}
              placeholder="닉네임을 입력해 주세요."
              value={nickname}
              setValue={setNickname}
            />
            <RadioItem
              title="유저 역할"
              items={["맴버", "매니저"]}
              selected={role}
              setSelected={setRole}
            />
          </VStack>
        )}
      </Wrapper>
      <Confirm
        sheetRef={sheetRef}
        title="그룹원 추방"
        description="정말로 그룹원을 추방하시겠습니까?"
        confirmText="추방하기"
        cancelText="취소하기"
        onConfirm={remove}
      />
    </Container>
  );
};

export { EditUser };
