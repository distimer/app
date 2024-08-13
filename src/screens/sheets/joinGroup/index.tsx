import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";

import { useTheme } from "contexts/theme";

import {
  HStack,
  PhosphorIcon,
  SheetContainer,
  Text,
  VStack,
} from "components/common";

interface InviteInfo {
  code: string;
  name: string;
  description: string;
  owner: string;
}
interface JoinGroupProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  info: InviteInfo;
  onSubmit: (code: string) => void;
}
const JoinGroup: React.FC<JoinGroupProps> = ({ sheetRef, info, onSubmit }) => {
  const { styles, colors } = useTheme();

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="그룹 정보 확인"
      gap={400}
      previous
      button={{
        title: "그룹에 참여하기",
        onPress: () => {
          onSubmit(info.code);
        },
      }}>
      <Text
        type="subheadline"
        weight="medium"
        color={colors.gray[500]}
        align="center">
        초대받은 그룹이 맞는지 확인해 주세요.
      </Text>
      <VStack
        gap={400}
        style={[
          styles.padding.all[600],
          styles.radius.all[500],
          styles.$background(colors.gray[100]),
        ]}>
        <VStack gap={200}>
          <Text type="title3" weight="semiBold" color={colors.gray[800]}>
            {info.name}
          </Text>
          <Text type="subheadline" weight="medium" color={colors.gray[500]}>
            {info.description}
          </Text>
        </VStack>
        <VStack gap={200}>
          <HStack align="center" gap={200}>
            <PhosphorIcon name="IdentificationCard" color={colors.gray[400]} />
            <Text type="body" weight="medium" color={colors.gray[400]}>
              {info.owner}
            </Text>
          </HStack>
          <HStack align="center" gap={200}>
            <PhosphorIcon name="Key" color={colors.gray[400]} />
            <Text type="body" weight="medium" color={colors.gray[400]}>
              {info.code}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </SheetContainer>
  );
};

export { JoinGroup };
export type { InviteInfo };
