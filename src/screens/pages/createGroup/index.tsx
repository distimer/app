import React from "react";

import { useMainNavigation } from "navigations";

import { postGroup, useGetGroup } from "api/endpoints/group/group";

import { useLoading } from "contexts/loading";

import { InputItem, RadioItem } from "components/common";
import { Container } from "components/layout";

const CreateGroup = () => {
  const { startLoading, endLoading } = useLoading();
  const navigation = useMainNavigation();

  const { refetch } = useGetGroup();

  const [name, setName] = React.useState("");
  const [namePass, setNamePass] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [descriptionPass, setDescriptionPass] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  const [nicknamePass, setNicknamePass] = React.useState(false);
  const [nicknamePolicy, setNicknamePolicy] = React.useState("");
  const [nicknamePolicyPass, setNicknamePolicyPass] = React.useState(false);

  const permissions = ["모두", "매니저", "그룹장만"];
  const [invitePolicy, setInvitePolicy] = React.useState(2);
  const [revealPolicy, setRevealPolicy] = React.useState(0);

  const submit = async () => {
    startLoading();
    try {
      await postGroup({
        name,
        description,
        nickname,
        nickname_policy: nicknamePolicy,
        invite_policy: invitePolicy,
        reveal_policy: revealPolicy,
      });
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="그룹 추가"
      gap={800}
      backable
      scrollable
      button={{
        title: "추가하기",
        disabled:
          !namePass || !descriptionPass || !nickname || !nicknamePolicyPass,
        onPress: submit,
      }}>
      <InputItem
        title="그룹명"
        icon="Graph"
        range={{
          min: 3,
          max: 30,
          pass: namePass,
          setPass: setNamePass,
        }}
        placeholder="그룹명을 입력해 주세요."
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
        placeholder="그룹에 대한 설명을 입력해 주세요."
        value={description}
        setValue={setDescription}
      />
      <InputItem
        title="닉네임"
        icon="IdentificationBadge"
        range={{
          min: 1,
          max: 20,
          pass: nicknamePass,
          setPass: setNicknamePass,
        }}
        placeholder="그룹에서 사용할 닉네임을 입력해 주세요."
        value={nickname}
        setValue={setNickname}
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
        placeholder="닉네임에 대한 규칙을 입력해 주세요."
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
    </Container>
  );
};

export { CreateGroup };
