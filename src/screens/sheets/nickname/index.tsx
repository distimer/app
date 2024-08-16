import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import React from "react";

import { useTheme } from "contexts/theme";

import { InputItem, SheetContainer, Text } from "components/common";

interface NicknameProps {
  sheetRef: React.RefObject<BottomSheetModal>;
  rule: string;
  onSubmit: (nickname: string) => void;
}
const Nickname: React.FC<NicknameProps> = ({ sheetRef, rule, onSubmit }) => {
  const { colors } = useTheme();

  const [nickname, setNickname] = React.useState("");
  const [pass, setPass] = React.useState(false);

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="닉네임 설정"
      previous
      onDismiss={() => {
        setNickname("");
      }}
      button={{
        title: "확인",
        disabled: !pass,
        onPress: () => {
          onSubmit(nickname);
        },
      }}>
      <Text
        type="subheadline"
        weight="medium"
        color={colors.gray[500]}
        align="center">
        {rule}
      </Text>
      <InputItem
        icon="IdentificationBadge"
        title="닉네임"
        placeholder="닉네임을 입력해 주세요"
        sheet
        value={nickname}
        setValue={setNickname}
        range={{
          min: 1,
          max: 10,
          pass,
          setPass,
        }}
      />
    </SheetContainer>
  );
};

export { Nickname };
