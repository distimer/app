import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import React from "react";
import { Keyboard, TouchableOpacity } from "react-native";

import moment from "moment";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";
import {
  postStudylog,
  useGetStudylogStatisticsDate,
} from "api/endpoints/study-log/study-log";
import { deleteTimer, putTimer, useGetTimer } from "api/endpoints/timer/timer";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { HStack, PhosphorIcon, Text, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm, TimerContent, TimerSubject } from "screens/sheets";

const Timer = () => {
  const { styles, colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const confirmSheetRef = React.useRef<BottomSheetModal>(null);
  const subjectSheetRef = React.useRef<BottomSheetModal>(null);
  const contentSheetRef = React.useRef<BottomSheetModal>(null);

  const navigation = useMainNavigation();

  const { refetch: refetchStudylog } = useGetStudylogStatisticsDate();
  const { data: timer, refetch } = useGetTimer();
  const { data: categories } = useGetCategory();

  const subjectData = React.useMemo(() => {
    if (!categories || !timer) return undefined;
    return categories
      .map((item) => {
        return [item.subjects.filter((s) => s.id === timer.subject_id)];
      })
      .flat()
      .flat()[0];
  }, [categories, timer]);

  const end = async () => {
    if (!timer) return;
    startLoading();
    try {
      await deleteTimer();
      await postStudylog({
        start_at: timer.start_at,
        end_at: moment().toISOString(),
        subject_id: timer.subject_id,
        groups_to_share: [],
        content: timer.content,
      });
      await refetchStudylog();
      navigation.reset({
        index: 0,
        routes: [{ name: "NavbarStack" }],
      });
    } finally {
      endLoading();
    }
  };

  const update = async ({
    subject,
    content,
  }: {
    subject?: string;
    content?: string;
  }) => {
    if (!timer) return;
    Keyboard.dismiss();
    startLoading();
    try {
      await putTimer({
        content: content || timer.content,
        subject_id: subject || timer.subject_id,
        shared_group_ids: [],
      });
      await refetch();
    } finally {
      endLoading();
    }
  };

  const [time, setTime] = React.useState("00:00:00");
  React.useEffect(() => {
    const updateTime = () => {
      if (!timer) return;
      const now = moment();
      const start = moment(timer.start_at);
      const duration = moment.duration(now.diff(start));
      const formatted = moment
        .utc(duration.asMilliseconds())
        .format("HH:mm:ss");
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 500);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Container
      dim
      button={{
        title: "공부 종료",
        onPress: () => confirmSheetRef.current?.present(),
      }}>
      <Wrapper
        data={
          subjectData !== undefined && timer !== undefined
            ? { subject: subjectData, timer }
            : undefined
        }>
        {(data) => (
          <VStack justify="between" fill>
            <VStack
              gap={200}
              style={[
                styles.radius.all[600],
                styles.padding.vertical[500],
                styles.padding.horizontal[600],
                styles.$border(2, data.subject.color),
              ]}>
              <HStack align="center" gap={200}>
                <PhosphorIcon name="GraduationCap" color={data.subject.color} />
                <Text type="title3" weight="semiBold" color={colors.gray[800]}>
                  {data.subject.name} 공부 중
                </Text>
              </HStack>
              <Text type="body" weight="medium" color={colors.gray[500]}>
                {data.timer.content}
              </Text>
            </VStack>
            <VStack align="center" gap={300}>
              <Text type="body" weight="medium" color={colors.gray[400]}>
                현재 공부 시간
              </Text>
              <Text type="important" weight="bold" color={colors.gray[800]}>
                {time}
              </Text>
            </VStack>
            <VStack gap={300}>
              <Item
                type="과목"
                onPress={() => {
                  subjectSheetRef.current?.present();
                }}>
                {data.subject.name}
              </Item>
              <Item
                type="공부 내용"
                onPress={() => {
                  contentSheetRef.current?.present();
                }}>
                {data.timer.content}
              </Item>
            </VStack>
            <TimerSubject
              sheetRef={subjectSheetRef}
              type="save"
              initial={data.subject.id}
              onSubmit={async (subject) => {
                await update({ subject });
                subjectSheetRef.current?.dismiss();
              }}
            />
            <TimerContent
              sheetRef={contentSheetRef}
              type="save"
              onSubmit={async (content) => {
                await update({ content });
                contentSheetRef.current?.dismiss();
              }}
            />
          </VStack>
        )}
      </Wrapper>
      <Confirm
        sheetRef={confirmSheetRef}
        title="공부를 종료하시겠습니까?"
        description={"공부를 종료하면 기록이 저장됩니다."}
        confirmText="네"
        cancelText="아니요"
        onConfirm={end}
      />
    </Container>
  );
};

interface ItemProps {
  children: string;
  type: string;
  onPress?: () => void;
}
const Item: React.FC<ItemProps> = ({ children, type, onPress }) => {
  const { styles, colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        align="center"
        gap={200}
        style={[
          styles.padding.vertical[400],
          styles.padding.horizontal[600],
          styles.radius.all[500],
          styles.$background(colors.gray[0]),
        ]}>
        <Text type="body" weight="medium" color={colors.gray[400]}>
          {type}
        </Text>
        <VStack fill>
          <Text type="body" weight="semiBold" color={colors.gray[700]}>
            {children}
          </Text>
        </VStack>
        <PhosphorIcon name="ArrowsClockwise" color={colors.gray[400]} />
      </HStack>
    </TouchableOpacity>
  );
};

export { Timer };
