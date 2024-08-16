import type { TimerType } from "../timerType";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { FlatList } from "react-native-gesture-handler";

import { useGetCategory } from "api/endpoints/category/category";

import { useTheme } from "contexts/theme";

import { filterUnclassifiedCategories, unclassifiedCategory } from "utils/func";

import {
  CardItem,
  Empty,
  SheetContainer,
  SmallButton,
  Text,
  VStack,
} from "components/common";
import { Wrapper } from "components/layout";

interface TimerSubjectProps {
  sheetRef: React.RefObject<BottomSheetModalMethods>;
  type: TimerType | "save";
  previous?: boolean;
  initial?: string;
  onSubmit: (subject: string) => void;
}
const TimerSubject: React.FC<TimerSubjectProps> = ({
  sheetRef,
  type,
  initial = "",
  previous,
  onSubmit,
}) => {
  const { styles, colors, values } = useTheme();

  const [subject, setSubject] = React.useState<string>(initial);
  const [excluded, setExcluded] = React.useState<string[]>([]);

  const { data } = useGetCategory();
  const subjectData = React.useMemo(() => {
    if (!data) return undefined;
    return data
      .map((item) => {
        return [item.subjects.filter((s) => s.id === subject)];
      })
      .flat()
      .flat()[0];
  }, [data, subject]);

  const filteredData = React.useMemo(() => {
    if (!data) return undefined;
    return filterUnclassifiedCategories(data);
  }, [data]);
  const filteredCategories = React.useMemo(
    () => (filteredData || []).filter((item) => !excluded.includes(item.id)),
    [filteredData, excluded],
  );

  React.useEffect(() => {
    setSubject(initial);
  }, [initial]);

  return (
    <SheetContainer
      sheetRef={sheetRef}
      previous={previous}
      title="과목 선택"
      fixed
      scrollable
      onDismiss={() => {
        setSubject(initial);
        setExcluded([]);
      }}
      button={{
        title:
          type === "save"
            ? subjectData
              ? `${subjectData.name} 과목 저장하기`
              : "건너뛰기"
            : subjectData
              ? type === "timer"
                ? `${subjectData.name} 과목 공부하기`
                : `${subjectData.name} 과목 기록하기`
              : "건너뛰기",
        disabled: data === undefined,
        onPress: () => {
          onSubmit(subject || unclassifiedCategory(data || []).subjects[0].id);
        },
      }}
      fixedComponent={
        <FlatList
          data={filterUnclassifiedCategories(data || [])}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.$marginHorizontal(values[-600])]}
          contentContainerStyle={[
            styles.padding.horizontal[600],
            styles.gap.all[200],
          ]}
          renderItem={({ item }) => (
            <SmallButton
              selected={!excluded.includes(item.id)}
              onPress={() => {
                if (excluded.includes(item.id)) {
                  setExcluded(excluded.filter((id) => id !== item.id));
                } else {
                  if (
                    filteredCategories
                      .find((c) => c.id === item.id)
                      ?.subjects.find((s) => s.id === subject)
                  ) {
                    setSubject("");
                  }
                  setExcluded([...excluded, item.id]);
                }
              }}>
              {item.name}
            </SmallButton>
          )}
        />
      }>
      <Wrapper
        data={filteredData}
        empty={
          <VStack justify="center" fill>
            <Empty>카테고리 / 과목이 없습니다.</Empty>
          </VStack>
        }>
        {() => (
          <FlatList
            data={filteredCategories}
            style={[styles.$marginHorizontal(values[-600])]}
            scrollEnabled={false}
            contentContainerStyle={[
              styles.gap.all[600],
              styles.padding.horizontal[600],
            ]}
            renderItem={({ item }) => (
              <VStack gap={300}>
                <Text
                  type="subheadline"
                  weight="medium"
                  color={colors.gray[500]}>
                  {item.name}
                </Text>
                <FlatList
                  data={item.subjects}
                  scrollEnabled={false}
                  contentContainerStyle={[styles.gap.all[300]]}
                  renderItem={({ item }) => (
                    <CardItem
                      title={item.name}
                      description="00:00:00"
                      color={item.color}
                      selected={subject === item.id}
                      onPress={() => {
                        if (subject === item.id) {
                          setSubject("");
                        } else {
                          setSubject(item.id);
                        }
                      }}
                    />
                  )}
                />
              </VStack>
            )}
          />
        )}
      </Wrapper>
    </SheetContainer>
  );
};

export { TimerSubject };
