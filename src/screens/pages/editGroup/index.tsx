import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";

import { useMainNavigation } from "navigations";

import {
  deleteGroupId,
  putGroupId,
  useGetGroup,
} from "api/endpoints/group/group";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { CardItem, InputItem, RadioItem, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm } from "screens/sheets";

const EditGroup = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "EditGroup">>();
  const navigation = useMainNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const confirmSheetRef = React.useRef<BottomSheetModal>(null);

  const { data, refetch } = useGetGroup();

  const [name, setName] = React.useState("");
  const [namePass, setNamePass] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [descriptionPass, setDescriptionPass] = React.useState(false);
  const [nicknamePolicy, setNicknamePolicy] = React.useState("");
  const [nicknamePolicyPass, setNicknamePolicyPass] = React.useState(false);

  const permissions = ["모두", "매니저", "그룹장만"];
  const [invitePolicy, setInvitePolicy] = React.useState(2);
  const [revealPolicy, setRevealPolicy] = React.useState(0);

  const groupData = React.useMemo(() => {
    if (!data) return undefined;
    return data.find((group) => group.id === params.id);
  }, [data, params.id]);

  React.useEffect(() => {
    if (!groupData) return;
    setName(groupData.name);
    setDescription(groupData.description);
    setNicknamePolicy(groupData.nickname_policy);
    setInvitePolicy(groupData.invite_policy);
    setRevealPolicy(groupData.reveal_policy);
  }, [groupData]);

  const isChanged = React.useMemo(() => {
    if (!groupData) return false;
    return (
      name !== groupData.name ||
      description !== groupData.description ||
      nicknamePolicy !== groupData.nickname_policy ||
      invitePolicy !== groupData.invite_policy ||
      revealPolicy !== groupData.reveal_policy
    );
  }, [
    groupData,
    name,
    description,
    nicknamePolicy,
    invitePolicy,
    revealPolicy,
  ]);

  const isPassed = React.useMemo(() => {
    return namePass && descriptionPass && nicknamePolicyPass ? true : false;
  }, [namePass, descriptionPass, nicknamePolicyPass]);

  const submit = async () => {
    startLoading();
    try {
      await putGroupId(params.id, {
        name,
        description,
        nickname_policy: nicknamePolicy,
        invite_policy: invitePolicy,
        reveal_policy: revealPolicy,
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  const remove = async () => {
    startLoading();
    try {
      await deleteGroupId(params.id);
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="그룹 정보 수정"
      backable
      scrollable
      trailingIcon={{
        name: "Trash",
        color: colors.solid.red,
        onPress: () => {
          confirmSheetRef.current?.present();
        },
      }}
      button={{
        title: "변경사항 저장하기",
        disabled: !(isChanged && isPassed),
        onPress: submit,
      }}>
      <Wrapper data={groupData}>
        {(data) => (
          <VStack gap={800}>
            <CardItem title={data.name} description={data.description} />
            <InputItem
              title="그룹 이름"
              icon="Graph"
              range={{
                min: 3,
                max: 30,
                pass: namePass,
                setPass: setNamePass,
              }}
              placeholder="그룹 이름을 입력해주세요."
              value={name}
              setValue={setName}
            />
            <InputItem
              title="그룹 설명"
              icon="Article"
              range={{
                min: 0,
                max: 100,
                pass: descriptionPass,
                setPass: setDescriptionPass,
              }}
              placeholder="그룹 설명을 입력해주세요."
              value={description}
              setValue={setDescription}
            />
            <InputItem
              title="닉네임 규칙"
              icon="NotePencil"
              range={{
                min: 0,
                max: 50,
                pass: nicknamePolicyPass,
                setPass: setNicknamePolicyPass,
              }}
              placeholder="닉네임 규칙을 입력해주세요."
              value={nicknamePolicy}
              setValue={setNicknamePolicy}
            />
            <RadioItem
              title="초대 권한"
              items={permissions}
              selected={invitePolicy}
              setSelected={setInvitePolicy}
            />
            <RadioItem
              title="학습기록 열람 권한"
              items={permissions}
              selected={revealPolicy}
              setSelected={setRevealPolicy}
            />
          </VStack>
        )}
      </Wrapper>
      <Confirm
        sheetRef={confirmSheetRef}
        title={"그룹 삭제"}
        description={
          "정말로 그룹을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
        }
        confirmText={"그룹 삭제"}
        cancelText="취소"
        onConfirm={remove}
      />
    </Container>
  );
};

export { EditGroup };
