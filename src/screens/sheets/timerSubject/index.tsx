import type { TimerType } from "../timerType";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import React from "react";
import { FlatList } from "react-native-gesture-handler";

import moment from "moment";

import { useGetCategory } from "api/endpoints/category/category";
import { useGetStudylogStatisticsTerm } from "api/endpoints/study-log/study-log";

import { useTheme } from "contexts/theme";

import {
  consume,
  filterUnclassifiedCategories,
  unclassifiedCategory,
} from "utils/func";

import {
  CardItem,
  Empty,
  SheetContainer,
  SmallButton,
  Text,
  VStack,
} from "components/common";
import { Graph } from "components/features/statistics";
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

  const { data: categories } = useGetCategory();
  const { data: statistics } = useGetStudylogStatisticsTerm({
    start_date: moment().subtract(6, "days").format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  });
  const subjectData = React.useMemo(() => {
    if (!categories) return undefined;
    return categories
      .map((item) => {
        return [item.subjects.filter((s) => s.id === subject)];
      })
      .flat()
      .flat()[0];
  }, [categories, subject]);

  const filteredData = React.useMemo(() => {
    if (!categories) return undefined;
    return filterUnclassifiedCategories(categories);
  }, [categories]);
  const filteredCategories = React.useMemo(
    () => (filteredData || []).filter((item) => !excluded.includes(item.id)),
    [filteredData, excluded],
  );

  const subjectStatistics = React.useMemo(() => {
    if (categories === undefined || statistics === undefined) return undefined;
    const result: {
      [key: string]: {
        date: string;
        sum: number;
      }[];
    } = {};
    for (const category of categories) {
      for (const subject of category.subjects) {
        result[subject.id] = [];
        for (const statistic of statistics) {
          let sum = 0;
          for (const log of statistic.log) {
            if (log.subject_id === subject.id) {
              sum += log.study_time;
            }
          }
          result[subject.id].push({
            date: statistic.date,
            sum,
          });
        }
      }
    }
    return result;
  }, [categories, statistics]);

  const maxSum = React.useMemo(() => {
    if (subjectStatistics === undefined) return 0;
    let max = 0;
    for (const key in subjectStatistics) {
      for (const item of subjectStatistics[key]) {
        if (item.sum > max) {
          max = item.sum;
        }
      }
    }
    return max;
  }, [subjectStatistics]);

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
        disabled: categories === undefined,
        onPress: () => {
          onSubmit(
            subject || unclassifiedCategory(categories || []).subjects[0].id,
          );
        },
      }}
      fixedComponent={
        <FlatList
          data={filterUnclassifiedCategories(categories || [])}
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
        data={subjectStatistics ? [subjectStatistics] : undefined}
        empty={
          <VStack justify="center" fill>
            <Empty>카테고리 / 과목이 없어요.</Empty>
          </VStack>
        }>
        {([statistics]) => (
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
                  renderItem={({ item }) => {
                    return (
                      <CardItem
                        title={item.name}
                        description={consume(statistics[item.id][6].sum)}
                        color={item.color}
                        selected={subject === item.id}
                        onPress={() => {
                          if (subject === item.id) {
                            setSubject("");
                          } else {
                            setSubject(item.id);
                          }
                        }}
                        trailingComponent={
                          <Graph
                            maxSum={maxSum}
                            selectedDates={[moment().format("YYYY-MM-DD")]}
                            data={statistics[item.id]}
                          />
                        }
                      />
                    );
                  }}
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
