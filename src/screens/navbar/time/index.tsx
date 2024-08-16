import React from "react";
import { Keyboard } from "react-native";

import {
  type BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import moment from "moment";

import { useMainNavigation } from "navigations";

import {
  postStudylog,
  useGetStudylogStatisticsTerm,
} from "api/endpoints/study-log/study-log";
import { postTimer, useGetTimer } from "api/endpoints/timer/timer";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { consume } from "utils/func";

import {
  Button,
  HStack,
  PhosphorIcon,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "components/common";
import { Graph } from "components/features/statistics";
import { Container, Wrapper } from "components/layout";

import {
  TimerContent,
  TimerGroup,
  TimerSubject,
  TimerType,
} from "screens/sheets";

const Time: React.FC = () => {
  const navigation = useMainNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();
  const { dismissAll } = useBottomSheetModal();

  const [today, setToday] = React.useState(moment().format("YYYY-MM-DD"));

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (moment().format("YYYY-MM-DD") === today) return;
      setToday(moment().format("YYYY-MM-DD"));
    }, 1000);
    return () => clearInterval(interval);
  }, [today]);

  const { data, refetch, isRefetching } = useGetStudylogStatisticsTerm({
    start_date: moment(today).subtract(7, "days").format("YYYY-MM-DD"),
    end_date: today,
  });
  const { refetch: refetchTimer } = useGetTimer();

  const typeSheetRef = React.useRef<BottomSheetModal>(null);
  const [type, setType] = React.useState<TimerType>("timer");
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  const subjectSheetRef = React.useRef<BottomSheetModal>(null);
  const [subject, setSubject] = React.useState<string>("");

  const groupSheetRef = React.useRef<BottomSheetModal>(null);
  const [groups, setGroups] = React.useState<string[]>([]);

  const contentSheetRef = React.useRef<BottomSheetModal>(null);

  const reset = () => {
    setType("timer");
    const now = new Date();
    now.setSeconds(0);
    setStartTime(moment(now).subtract(1, "hour").toDate());
    setEndTime(now);
    setSubject("");
    setGroups([]);
  };

  const statistics = React.useMemo(() => {
    if (!data) return undefined;
    const result = [];
    for (const statistic of data) {
      let sum = 0;
      for (const log of statistic.log) {
        sum += log.study_time;
      }
      result.push({
        date: statistic.date,
        sum,
      });
    }
    return result;
  }, [data]);
  const maxSum = React.useMemo(() => {
    if (!statistics) return 0;
    return Math.max(...statistics.map((statistic) => statistic.sum));
  }, [statistics]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetching) return;
    setRefreshing(false);
  }, [isRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

  const submit = async (content: string) => {
    Keyboard.dismiss();
    startLoading();
    try {
      if (type === "timer") {
        await postTimer({
          subject_id: subject,
          shared_group_ids: groups,
          content,
        });
        await refetchTimer();
        navigation.reset({
          index: 0,
          routes: [{ name: "Timer" }],
        });
      } else {
        await postStudylog({
          subject_id: subject,
          groups_to_share: groups,
          content,
          start_at: moment(startTime).toISOString(),
          end_at: moment(endTime).toISOString(),
        });
        await refetch();
        dismissAll();
      }
    } finally {
      endLoading();
    }
  };

  // return null;

  return (
    <Container
      dim
      scrollable
      refreshControl={{
        refreshing,
        onRefresh,
      }}>
      <VStack justify="center" fill>
        <Wrapper
          data={statistics}
          skeleton={
            <Skeleton color={colors.gray[200]}>
              <VStack gap={1000}>
                <VStack align="center" gap={800}>
                  <VStack align="center" gap={300}>
                    <SkeletonText type="body" weight="medium" width={110} />
                    <SkeletonText type="important" weight="bold" width={180} />
                  </VStack>
                  <VStack align="center" gap={400}>
                    <Graph
                      maxSum={10}
                      selectedDates={[]}
                      data={[
                        {
                          date: "",
                          sum: 4,
                        },
                        {
                          date: "",
                          sum: 7,
                        },
                        {
                          date: "",
                          sum: 5,
                        },
                        {
                          date: "",
                          sum: 2,
                        },
                        {
                          date: "",
                          sum: 5,
                        },
                        {
                          date: "",
                          sum: 6,
                        },
                        {
                          date: "",
                          sum: 10,
                        },
                        {
                          date: "",
                          sum: 2,
                        },
                      ]}
                    />
                    <SkeletonText
                      type="footnote"
                      weight="medium"
                      width={140}
                      line={2}
                    />
                  </VStack>
                  <SkeletonText
                    type="subheadline"
                    weight="semiBold"
                    width={110}
                  />
                </VStack>
                <Button>공부 기록하기</Button>
              </VStack>
            </Skeleton>
          }>
          {(statistics) => (
            <VStack gap={1000}>
              <VStack align="center" gap={800}>
                <VStack align="center" gap={300}>
                  <Text type="body" weight="medium" color={colors.gray[500]}>
                    오늘 공부한 시간
                  </Text>
                  <Text type="important" weight="bold" color={colors.gray[800]}>
                    {consume(statistics[7].sum)}
                  </Text>
                </VStack>
                <VStack align="center" gap={400}>
                  <Graph
                    maxSum={maxSum}
                    selectedDates={[today]}
                    data={statistics}
                  />
                  <Text
                    type="footnote"
                    weight="medium"
                    color={colors.gray[400]}
                    align="center"
                    line={2}>
                    지난 주에 비해{"\n"}
                    {statistics[0].sum === statistics[7].sum ? (
                      <>공부량이 같아요.</>
                    ) : (
                      <>
                        {consume(
                          Math.abs(statistics[0].sum - statistics[7].sum),
                        )}{" "}
                        {statistics[7].sum > statistics[0].sum
                          ? "더 많이 공부하고 있어요."
                          : "적게 공부하고 있어요."}
                      </>
                    )}
                  </Text>
                </VStack>
                <HStack align="center" gap={100}>
                  <Text
                    type="subheadline"
                    weight="semiBold"
                    color={colors.gray[700]}>
                    학습기록 보기
                  </Text>
                  <PhosphorIcon
                    name="ArrowRight"
                    size={20}
                    color={colors.gray[700]}
                  />
                </HStack>
              </VStack>
              <Button
                onPress={() => {
                  reset();
                  typeSheetRef.current?.present();
                }}>
                공부 기록하기
              </Button>
            </VStack>
          )}
        </Wrapper>
      </VStack>
      <TimerType
        sheetRef={typeSheetRef}
        start={{
          date: startTime,
          setDate: setStartTime,
        }}
        end={{
          date: endTime,
          setDate: setEndTime,
        }}
        onSubmit={(type) => {
          setType(type);
          subjectSheetRef.current?.present();
        }}
      />
      <TimerSubject
        sheetRef={subjectSheetRef}
        type={type}
        previous
        initial={subject}
        onSubmit={(subject) => {
          setSubject(subject);
          groupSheetRef.current?.present();
        }}
      />
      <TimerGroup
        sheetRef={groupSheetRef}
        previous
        initial={groups}
        onSubmit={(groups) => {
          setGroups(groups);
          contentSheetRef.current?.present();
        }}
      />
      <TimerContent
        sheetRef={contentSheetRef}
        type={type}
        previous
        onSubmit={submit}
      />
    </Container>
  );
};

export { Time };
