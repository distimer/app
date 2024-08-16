import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { PhosphorIconName } from "components/common";

import React from "react";
import { TouchableOpacity } from "react-native";

import { useTheme } from "contexts/theme";

import { HStack, PhosphorIcon, SheetContainer, Text } from "components/common";

interface UserActionProps {
  sheetRef: React.RefObject<BottomSheetModal>;
  nickname: string;
  canView: boolean;
  canEdit: boolean;
  actions: {
    viewStudylogs: () => void;
    viewStatistics: () => void;
    editUser: () => void;
  };
}
const UserAction: React.FC<UserActionProps> = ({
  sheetRef,
  nickname,
  canView,
  canEdit,
  actions,
}) => {
  return (
    <SheetContainer sheetRef={sheetRef} title={nickname}>
      <Item
        icon="ListChecks"
        title="학습기록 보기"
        disabled={!canView}
        onPress={actions.viewStudylogs}
      />
      <Item
        icon="ChartBar"
        title="학습통계 보기"
        disabled={!canView}
        onPress={actions.viewStatistics}
      />
      <Item
        icon="PencilSimpleLine"
        title="정보 수정하기"
        disabled={!canEdit}
        onPress={actions.editUser}
      />
    </SheetContainer>
  );
};

interface ItemProps {
  icon: PhosphorIconName;
  title: string;
  disabled: boolean;
  onPress: () => void;
}
const Item: React.FC<ItemProps> = ({ icon, title, disabled, onPress }) => {
  const { styles, colors } = useTheme();

  const color = disabled ? colors.gray[400] : colors.gray[700];

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <HStack align="center" gap={500} style={[styles.padding.all[200]]}>
        <PhosphorIcon name={icon} color={color} />
        <Text type="body" weight="medium" color={color}>
          {title}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { UserAction };
