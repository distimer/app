import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { TouchableOpacity } from "react-native";

import moment from "moment";
import "moment/locale/ko";

import { useTheme } from "contexts/theme";

import { HStack, Icon, SheetContainer, Text, VStack } from "components/common";

import { DatePicker } from "../datePicker";

type TimerType = "timer" | "manual";
interface TimerTypeProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  onSubmit: (type: TimerType, start: Date, end: Date) => void;
}
const TimerType: React.FC<TimerTypeProps> = ({ sheetRef, onSubmit }) => {
  const { colors } = useTheme();

  const [type, setType] = React.useState<TimerType>("timer");
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  return (
    <SheetContainer
      sheetRef={sheetRef}
      title="기록 방식 설정"
      gap={300}
      button={{
        title: "다음",
        onPress: () => {
          onSubmit(type, startTime, endTime);
        },
      }}
      onDismiss={() => {
        setType("timer");
        setStartTime(new Date());
        setEndTime(new Date());
      }}>
      <Item
        title="타이머로 기록하기"
        selected={type === "timer"}
        onPress={() => {
          setType("timer");
        }}
      />
      <Item
        title="직접 기록하기"
        selected={type === "manual"}
        onPress={() => {
          setType("manual");
        }}>
        {(selected) => (
          <HStack align="center" gap={600}>
            <Text
              type="subheadline"
              weight="medium"
              color={selected ? colors.gray[400] : colors.gray[300]}>
              시간
            </Text>
            <HStack align="center" gap={100}>
              <DateItem
                disabled={!selected}
                date={startTime}
                setDate={setStartTime}
              />
              <Text
                type="title3"
                weight="medium"
                color={selected ? colors.gray[400] : colors.gray[300]}>
                ~
              </Text>
              <DateItem
                disabled={!selected}
                date={endTime}
                setDate={setEndTime}
              />
            </HStack>
          </HStack>
        )}
      </Item>
    </SheetContainer>
  );
};

interface ItemProps {
  children?: (selected: boolean) => React.ReactNode;
  title: string;
  selected: boolean;
  onPress?: () => void;
}
const Item: React.FC<ItemProps> = ({ children, title, selected, onPress }) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity disabled={selected} onPress={onPress}>
      <VStack
        gap={400}
        style={[
          styles.padding.vertical[500],
          styles.padding.horizontal[600],
          styles.radius.all[500],
          styles.$background(colors.gray[100]),
        ]}>
        <HStack align="center" gap={300}>
          <Icon
            name={selected ? "RadioButtonOnIcon" : "RadioButtonOffIcon"}
            fill={selected ? colors.gray[700] : colors.gray[400]}
          />
          <Text
            type="body"
            weight={selected ? "semiBold" : "medium"}
            color={selected ? colors.gray[700] : colors.gray[400]}>
            {title}
          </Text>
        </HStack>
        {children && children(selected)}
      </VStack>
    </TouchableOpacity>
  );
};

interface DateSharedProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
interface DateItemProps extends DateSharedProps {
  disabled?: boolean;
}
const DateItem: React.FC<DateItemProps> = ({
  disabled = false,
  date,
  setDate,
}) => {
  const { styles, colors } = useTheme();

  const sheetRef = React.useRef<BottomSheetModalMethods>(null);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        sheetRef.current?.present();
      }}>
      <VStack
        style={[
          styles.padding.horizontal[400],
          styles.padding.vertical[200],
          styles.radius.all[300],
          styles.$background(colors.gray[200]),
        ]}>
        <Text
          type="footnote"
          weight="medium"
          color={disabled ? colors.gray[400] : colors.gray[700]}>
          {moment(date).format("M월 D일 (ddd)")}
        </Text>
        <Text
          type="body"
          weight="medium"
          color={disabled ? colors.gray[400] : colors.gray[700]}>
          {moment(date).format("A h:mm")}
        </Text>
      </VStack>
      <DatePicker sheetRef={sheetRef} date={date} setDate={setDate} />
    </TouchableOpacity>
  );
};

export { TimerType };
export type { DateSharedProps };
