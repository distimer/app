import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { Keyboard } from "react-native";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { useTheme } from "contexts/theme";

import { HStack, SheetContainer, Text, VStack } from "components/common";

interface InviteCodeProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  onSubmit: (code: string) => void;
}
const InviteCode: React.FC<InviteCodeProps> = ({ sheetRef, onSubmit }) => {
  const { styles, colors } = useTheme();

  const [code, setCode] = React.useState("");

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="초대 코드 입력"
      onDismiss={() => {
        setCode("");
      }}
      button={{
        title: "초대 코드 입력 완료",
        disabled: code.length !== 7,
        onPress: () => {
          Keyboard.dismiss();
          onSubmit(code);
        },
      }}>
      <VStack align="center" gap={400}>
        <Text type="subheadline" weight="medium" color={colors.gray[500]}>
          전송받은 초대 코드를 입력해 주세요.
        </Text>
        <HStack>
          <BottomSheetTextInput
            pointerEvents="box-only"
            style={[
              styles.absoluteFill,
              styles.$index(1),
              {
                textAlign: "center",
                opacity: 0,
              },
            ]}
            value={code}
            onChangeText={(text) => {
              if (text.length > 7) return;
              setCode(text);
            }}
          />
          <HStack gap={100}>
            <Item>{code[0]}</Item>
            <Item>{code[1]}</Item>
            <Item>{code[2]}</Item>
            <Item>{code[3]}</Item>
            <Item>{code[4]}</Item>
            <Item>{code[5]}</Item>
            <Item>{code[6]}</Item>
          </HStack>
        </HStack>
      </VStack>
    </SheetContainer>
  );
};

interface ItemProps {
  children?: string;
}
const Item: React.FC<ItemProps> = ({ children }) => {
  const { styles, colors } = useTheme();

  return (
    <VStack
      align="center"
      justify="center"
      style={[
        styles.radius.all[300],
        styles.$width(40),
        styles.$height(48),
        styles.$background(children ? colors.gray[200] : colors.gray[100]),
      ]}>
      <Text type="title2" weight="medium" color={colors.gray[700]}>
        {children}
      </Text>
    </VStack>
  );
};

export { InviteCode };
