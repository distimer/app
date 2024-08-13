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
  useGetStudylogStatisticsDate,
} from "api/endpoints/study-log/study-log";
import { postTimer, useGetTimer } from "api/endpoints/timer/timer";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import {
  Button,
  HStack,
  PhosphorIcon,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "components/common";
import { Container, Wrapper } from "components/layout";

import {
  TimerContent,
  TimerGroup,
  TimerSubject,
  TimerType,
} from "screens/sheets";

const Time: React.FC = () => {
  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();
  const { dismissAll } = useBottomSheetModal();

  const navigation = useMainNavigation();

  const { data, refetch, isRefetching } = useGetStudylogStatisticsDate();
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
    setStartTime(new Date());
    setEndTime(new Date());
    setSubject("");
  };

  const todayStudyTime = React.useMemo(() => {
    if (!data) return "00:00:00";
    let sum = 0;
    for (const log of data) {
      if (!log.study_time) continue;
      sum += log.study_time;
    }
    return moment.utc(sum * 1000).format("HH:mm:ss");
  }, [data]);

  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    if (isRefetching) return;
    setRefreshing(isRefetching);
  }, [isRefetching]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
  };

  const submit = async (content: string) => {
    Keyboard.dismiss();
    if (type === "timer") {
      startLoading();
      try {
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
      } finally {
        endLoading();
      }
    } else {
      startLoading();
      try {
        await postStudylog({
          start_at: moment(startTime).set({ second: 0 }).toISOString(),
          end_at: moment(endTime).set({ second: 0 }).toISOString(),
          subject_id: subject,
          groups_to_share: groups,
          content,
        });
        await refetch();
        dismissAll();
      } finally {
        console.log(moment(startTime).toISOString());
        endLoading();
      }
    }
  };

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
          data={data}
          skeleton={
            <Skeleton>
              <VStack gap={1000}>
                <VStack align="center" gap={800}>
                  <VStack align="center" gap={300}>
                    <SkeletonText type="body" weight="medium" width={110} />
                    <SkeletonText type="important" weight="bold" width={180} />
                  </VStack>
                  <VStack align="center" gap={400}>
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
          {() => (
            <VStack gap={1000}>
              <VStack align="center" gap={800}>
                <VStack align="center" gap={300}>
                  <Text type="body" weight="medium" color={colors.gray[500]}>
                    오늘 공부한 시간
                  </Text>
                  <Text type="important" weight="bold" color={colors.gray[800]}>
                    {todayStudyTime}
                  </Text>
                </VStack>
                <VStack align="center" gap={400}>
                  <Text
                    type="footnote"
                    weight="medium"
                    color={colors.gray[400]}
                    align="center"
                    line={2}>
                    지난 주에 비해{"\n"}2시간 적게 공부하고 있어요.
                  </Text>
                </VStack>
                <HStack align="center" gap={100}>
                  <Text
                    type="subheadline"
                    weight="semiBold"
                    color={colors.gray[700]}>
                    학습 기록 보기
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
        onSubmit={(type, start, end) => {
          setType(type);
          setStartTime(start);
          setEndTime(end);
          subjectSheetRef.current?.present();
        }}
      />
      <TimerSubject
        sheetRef={subjectSheetRef}
        type={type}
        previous
        onSubmit={(subject) => {
          setSubject(subject);
          groupSheetRef.current?.present();
        }}
      />
      <TimerGroup
        sheetRef={groupSheetRef}
        previous
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
