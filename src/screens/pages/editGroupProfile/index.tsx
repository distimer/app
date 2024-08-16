import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";

import {
  patchGroupNicknameId,
  useGetGroupMemberId,
} from "api/endpoints/group/group";
import { useGetUser } from "api/endpoints/user/user";

import { useLoading } from "contexts/loading";

import { CardItem, InputItem, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

const EditGroupProfile = () => {
  const { params } =
    useRoute<RouteProp<PagesStackParamList, "EditGroupProfile">>();

  const { startLoading, endLoading } = useLoading();

  const [nickname, setNickname] = React.useState("");
  const [pass, setPass] = React.useState(false);

  const { data: members, refetch } = useGetGroupMemberId(params.id);
  const { data: user } = useGetUser();

  const profileData = React.useMemo(() => {
    if (!members || !user) return undefined;
    return members.find((member) => member.user_id === user.user_id);
  }, [members, user]);

  React.useEffect(() => {
    if (!profileData) return;
    setNickname(profileData.nickname);
  }, [profileData]);

  const isChanged = React.useMemo(() => {
    if (!profileData) return false;
    return profileData.nickname !== nickname;
  }, [profileData, nickname]);

  const submit = async () => {
    startLoading();
    try {
      await patchGroupNicknameId(params.id, {
        nickname,
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="그룹 프로필 수정"
      backable
      scrollable
      button={{
        title: "변경사항 저장하기",
        disabled: !pass || !isChanged,
        onPress: submit,
      }}>
      <Wrapper data={profileData}>
        {(data) => (
          <VStack gap={800}>
            <CardItem
              title={data.nickname}
              description={["맴버", "매니저", "그룹장"][data.role]}
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
          </VStack>
        )}
      </Wrapper>
    </Container>
  );
};

export { EditGroupProfile };
