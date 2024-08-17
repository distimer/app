import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useGetGroup } from "api/endpoints/group/group";

import { useTheme } from "contexts/theme";

import {
  Empty,
  HStack,
  Icon,
  SheetContainer,
  Text,
  VStack,
} from "components/common";
import { Wrapper } from "components/layout";

interface TimerGroupProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  previous?: boolean;
  initial?: string[];
  onSubmit: (groups: string[]) => void;
}
const TimerGroup: React.FC<TimerGroupProps> = ({
  sheetRef,
  initial = [],
  previous,
  onSubmit,
}) => {
  const { styles, colors } = useTheme();

  const [groups, setGroups] = React.useState(initial);

  const { data } = useGetGroup();

  const isAllSelected =
    data && data?.length > 0 && data?.length === groups.length;

  React.useEffect(() => {
    setGroups(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initial)]);

  return (
    <SheetContainer
      sheetRef={sheetRef}
      previous={previous}
      title="공유할 그룹 선택"
      fixed
      scrollable
      onDismiss={() => {
        setGroups(initial);
      }}
      fixedComponent={
        <TouchableOpacity
          onPress={() => {
            if (isAllSelected) {
              setGroups([]);
            } else {
              setGroups(data?.map((item) => item.id) || []);
            }
          }}>
          <HStack
            align="center"
            justify="between"
            style={[
              styles.padding.vertical[200],
              styles.padding.horizontal[600],
              styles.radius.all[400],
              styles.$background(colors.gray[100]),
            ]}>
            <Text type="subheadline" weight="semiBold" color={colors.gray[800]}>
              전체 선택
            </Text>
            <Icon
              name={
                isAllSelected ? "CheckBoxLargeOnIcon" : "CheckBoxLargeOffIcon"
              }
              fill={colors.gray[700]}
            />
          </HStack>
        </TouchableOpacity>
      }
      button={{
        title: groups.length
          ? `${groups.length}개 그룹에 공유하기`
          : "건너뛰기",
        onPress: () => {
          onSubmit(groups);
        },
      }}>
      <Wrapper
        data={data}
        empty={
          <VStack justify="center" fill>
            <Empty>참여하고 있는 그룹이 없어요.</Empty>
          </VStack>
        }>
        {(data) => (
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={[styles.gap.all[300]]}
            renderItem={({ item }) => (
              <Item
                selected={groups.includes(item.id)}
                onPress={() => {
                  if (groups.includes(item.id)) {
                    setGroups(groups.filter((group) => group !== item.id));
                  } else {
                    setGroups([...groups, item.id]);
                  }
                }}>
                {item.name}
              </Item>
            )}
          />
        )}
      </Wrapper>
    </SheetContainer>
  );
};

interface ItemProps {
  children: string;
  selected: boolean;
  onPress: () => void;
}
const Item: React.FC<ItemProps> = ({ children, selected, onPress }) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        align="center"
        gap={200}
        style={[
          styles.padding.vertical[400],
          styles.padding.horizontal[600],
          styles.radius.all[400],
          styles.$background(colors.gray[100]),
        ]}>
        <Icon
          name={selected ? "CheckBoxSmallOnIcon" : "CheckBoxSmallOffIcon"}
          fill={colors.gray[700]}
        />
        <Text type="body" weight="medium" color={colors.gray[700]}>
          {children}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export { TimerGroup };
