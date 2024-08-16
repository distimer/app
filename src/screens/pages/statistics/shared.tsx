/* eslint-disable no-case-declarations */
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import React from "react";
import { FlatList } from "react-native";

import moment from "moment";

import { useTheme } from "contexts/theme";

import { diff } from "utils/func";

import { DateBar, Empty, SmallButton, VStack } from "components/common";
import { Compare, Group, Overview } from "components/features/statistics";
import { Container, Wrapper } from "components/layout";

import { DatePicker } from "screens/sheets";

export interface SharedStatisticsProps {
  type: Type;
  setType: React.Dispatch<React.SetStateAction<Type>>;
  targetDate: string;
  setTargetDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  endDate: string;
  compareStartDate: string;
  compareEndDate: string;
}
export interface Statistic {
  date: string;
  log: {
    category_id: string;
    category_name: string;
    subject_id: string;
    subject_name: string;
    subject_color: string;
    study_time: number;
  }[];
}
interface Studylog {
  category_id: string;
  category_name: string;
  subject_id: string;
  subject_name: string;
  subject_color: string;
  start_at: string;
  end_at: string;
}
interface Data {
  statistics: Statistic[];
  studylogs: Studylog[];
  compareStatistics: Statistic[];
}
export type Type = "daily" | "weekly" | "monthly";
interface ViewStatisticsProps extends SharedStatisticsProps {
  data: Data | undefined | null;
  nickname?: string;
  refreshing: boolean;
  onRefresh: () => void;
}
const ViewStatistics: React.FC<ViewStatisticsProps> = ({
  type,
  setType,
  targetDate,
  setTargetDate,
  startDate,
  endDate,
  data,
  nickname,
  refreshing,
  onRefresh,
}) => {
  const { styles } = useTheme();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const types = {
    daily: "일간",
    weekly: "주간",
    monthly: "월간",
  };

  const [pickerDate, setPickerDate] = React.useState(new Date());

  React.useEffect(() => {
    if (targetDate === moment().format("YYYY-MM-DD")) return;
    setPickerDate(moment(targetDate).toDate());
  }, [targetDate]);
  React.useEffect(() => {
    if (pickerDate === new Date()) return;
    setTargetDate(moment(pickerDate).format("YYYY-MM-DD"));
  }, [pickerDate, setTargetDate]);

  const showDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(targetDate).format("YYYY년 M월 D일 (ddd)");
      case "weekly":
        const weekOfMonth = Math.ceil(moment(targetDate).date() / 7);
        return `${moment(targetDate).format("YYYY년 M월")} ${weekOfMonth}주차`;
      case "monthly":
        return `${moment(targetDate).startOf("month").format("YYYY년 M월")}`;
    }
  }, [type, targetDate]);

  return (
    <Container
      title={`${nickname !== undefined ? nickname : "나의"} 학습통계`}
      backable
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}
      fixedComponent={
        <VStack gap={400}>
          <DateBar
            title={showDate}
            onLeft={() => {
              switch (type) {
                case "daily":
                  setTargetDate(
                    moment(targetDate).subtract(1, "day").format("YYYY-MM-DD"),
                  );
                  break;
                case "weekly":
                  setTargetDate(
                    moment(targetDate).subtract(1, "week").format("YYYY-MM-DD"),
                  );
                  break;
                case "monthly":
                  setTargetDate(
                    moment(targetDate)
                      .subtract(1, "month")
                      .format("YYYY-MM-DD"),
                  );
                  break;
              }
            }}
            onCenter={() => {
              sheetRef.current?.present();
            }}
            onRight={() => {
              switch (type) {
                case "daily":
                  setTargetDate(
                    moment(targetDate).add(1, "day").format("YYYY-MM-DD"),
                  );
                  break;
                case "weekly":
                  setTargetDate(
                    moment(targetDate).add(1, "week").format("YYYY-MM-DD"),
                  );
                  break;
                case "monthly":
                  setTargetDate(
                    moment(targetDate).add(1, "month").format("YYYY-MM-DD"),
                  );
                  break;
              }
            }}
          />
          <FlatList
            data={Object.keys(types)}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={[
              styles.justify.center,
              styles.gap.all[200],
              styles.$grow(1),
            ]}
            renderItem={({ item }) => {
              const target = item as keyof typeof types;
              return (
                <SmallButton
                  selected={type === target}
                  onPress={() => {
                    setType(target);
                  }}>
                  {types[target]}
                </SmallButton>
              );
            }}
          />
        </VStack>
      }>
      <Wrapper data={data}>
        {(data) =>
          data === null ? (
            <VStack justify="center" fill>
              <Empty>학습기록이 없어요.</Empty>
            </VStack>
          ) : (
            <ListStatistics
              targetDate={targetDate}
              startDate={startDate}
              endDate={endDate}
              type={type}
              data={data}
            />
          )
        }
      </Wrapper>
      <DatePicker
        sheetRef={sheetRef}
        onlyDate
        date={pickerDate}
        setDate={setPickerDate}
      />
    </Container>
  );
};

interface ListStatisticsProps {
  targetDate: string;
  startDate: string;
  endDate: string;
  type: Type;
  data: Data;
}
const ListStatistics: React.FC<ListStatisticsProps> = ({
  targetDate,
  startDate,
  endDate,
  type,
  data,
}) => {
  const showDate = React.useMemo(() => {
    switch (type) {
      case "daily":
        return moment(startDate).format("YYYY년 M월 D일 (ddd)");
      case "weekly":
      case "monthly":
        return `${moment(startDate).format(
          "YYYY년 M월 D일",
        )} ~ ${moment(endDate).format("YYYY년 M월 D일")}`;
    }
  }, [type, startDate, endDate]);

  const overview = React.useMemo(() => {
    const total = data.statistics
      .flatMap((statistic) => statistic.log)
      .reduce((acc, cur) => acc + (cur?.study_time || 0), 0);

    const overview = {
      total,
      left: {
        title: "",
        value: 0,
      },
      right: {
        title: "",
        value: 0,
      },
    };
    if (type === "daily") {
      let total = 0;
      let largest = 0;
      for (const studylog of data.studylogs) {
        const seconds = diff(studylog.start_at, studylog.end_at);
        total += seconds;
        if (seconds > largest) largest = seconds;
      }
      overview.left.title = "기록 평균 시간";
      overview.right.title = "기록 최대 시간";
      overview.left.value = total / data.studylogs.length;
      overview.right.value = largest;
    } else {
      let total = 0;
      let largest = 0;
      for (const statistic of data.statistics) {
        if (statistic.log.length === 0) continue;
        const sum = statistic.log.reduce((acc, cur) => acc + cur.study_time, 0);
        total += sum;
        if (sum > largest) largest = sum;
      }
      overview.left.title = "하루 평균 시간";
      overview.right.title = "하루 최대 시간";
      overview.left.value = total / data.statistics.length;
      overview.right.value = largest;
    }

    return overview;
  }, [data, type]);

  const groupCategory = React.useMemo(() => {
    const result: {
      id: string;
      name: string;
      total: number;
    }[] = [];

    for (const statistic of data.statistics) {
      for (const log of statistic.log) {
        const index = result.findIndex((item) => item.id === log.category_id);
        if (index === -1) {
          result.push({
            id: log.category_id,
            name: log.category_name,
            total: log.study_time,
          });
        } else {
          result[index].total += log.study_time;
        }
      }
    }

    return result.sort(
      (a, b) => b.total - a.total || a.name.localeCompare(b.name),
    );
  }, [data]);

  const groupSubject = React.useMemo(() => {
    const result: {
      id: string;
      name: string;
      color: string;
      total: number;
    }[] = [];

    for (const statistic of data.statistics) {
      for (const log of statistic.log) {
        const index = result.findIndex((item) => item.id === log.subject_id);
        if (index === -1) {
          result.push({
            id: log.subject_id,
            name: log.subject_name,
            color: log.subject_color,
            total: log.study_time,
          });
        } else {
          result[index].total += log.study_time;
        }
      }
    }

    return result.sort(
      (a, b) => b.total - a.total || a.name.localeCompare(b.name),
    );
  }, [data]);

  return (
    <VStack gap={400}>
      <Overview
        title={showDate}
        total={overview.total}
        leftTitle={overview.left.title}
        rightTitle={overview.right.title}
        leftValue={overview.left.value}
        rightValue={overview.right.value}
      />
      <Compare
        type={type}
        targetDate={targetDate}
        data={data.compareStatistics}
      />
      <Group title="카테고리별 공부량" data={groupCategory} />
      <Group title="과목별 공부량" data={groupSubject} />
    </VStack>
  );
};

export { ViewStatistics };
