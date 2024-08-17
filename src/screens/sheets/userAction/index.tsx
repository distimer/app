import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { PhosphorIconName } from "components/common";

import React from "react";
import { TouchableOpacity } from "react-native";

import moment from "moment";

import { useMainNavigation } from "navigations";

import { useTheme } from "contexts/theme";

import {
  HStack,
  PhosphorIcon,
  SheetContainer,
  Text,
  TimerItem,
  VStack,
} from "components/common";

interface UserActionProps {
  sheetRef: React.RefObject<BottomSheetModal>;
  group: string;
  user: {
    id: string;
    nickname: string;
    timer?: {
      color: string;
      subject: string;
      content: string;
      startTime: string;
    };
  };
  canView: boolean;
  canEdit: boolean;
}
const UserAction: React.FC<UserActionProps> = ({
  sheetRef,
  group,
  user,
  canView,
  canEdit,
}) => {
  const navigation = useMainNavigation();

  const { colors } = useTheme();

  const [time, setTime] = React.useState("00:00:00");
  React.useEffect(() => {
    const updateTime = () => {
      if (!user.timer) return;
      const now = moment();
      const start = moment(user.timer.startTime);
      const duration = moment.duration(now.diff(start));
      const formatted = moment
        .utc(duration.asMilliseconds())
        .format("HH:mm:ss");
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 500);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <SheetContainer sheetRef={sheetRef} title={user.nickname}>
      {canView ? (
        user.timer ? (
          <VStack gap={600}>
            <TimerItem
              title={`${user.timer.subject} 공부 중`}
              description={user.timer.content}
              color={user.timer.color}
            />
            <VStack align="center" gap={300}>
              <Text type="body" weight="medium" color={colors.gray[400]}>
                현재 공부 시간
              </Text>
              <Text type="important" weight="bold" color={colors.gray[800]}>
                {time}
              </Text>
            </VStack>
          </VStack>
        ) : (
          <TimerItem
            title="공부를 하고 있지 않아요"
            description="작동 중인 타이머 없음"
            color={colors.gray[400]}
          />
        )
      ) : null}
      <Item
        icon="ListChecks"
        title="학습기록 보기"
        disabled={!canView}
        onPress={() => {
          sheetRef.current?.dismiss();
          navigation.navigate("PagesStack", {
            screen: "OtherStudylogs",
            params: {
              group: group,
              user: user.id,
            },
          });
        }}
      />
      <Item
        icon="ChartBar"
        title="학습통계 보기"
        disabled={!canView}
        onPress={() => {
          sheetRef.current?.dismiss();
          navigation.navigate("PagesStack", {
            screen: "OtherStudylogs",
            params: {
              group: group,
              user: user.id,
            },
          });
        }}
      />
      <Item
        icon="PencilSimpleLine"
        title="정보 수정하기"
        disabled={!canEdit}
        onPress={() => {
          sheetRef.current?.dismiss();
          navigation.navigate("PagesStack", {
            screen: "OtherStudylogs",
            params: {
              group: group,
              user: user.id,
            },
          });
        }}
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
