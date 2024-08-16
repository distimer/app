import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { RouteProp } from "@react-navigation/native";
import type { PagesStackParamList } from "navigations/pages";

import React from "react";

import { useRoute } from "@react-navigation/native";
import moment from "moment";

import { useMainNavigation } from "navigations";

import { useGetCategory } from "api/endpoints/category/category";
import {
  deleteStudylogId,
  putStudylogId,
  useGetStudylogDate,
  useGetStudylogDetailId,
} from "api/endpoints/study-log/study-log";

import { useLoading } from "contexts/loading";
import { useTheme } from "contexts/theme";

import { compareArray, timestamp } from "utils/func";

import { ButtonItem, CardItem, InputItem, VStack } from "components/common";
import { Container, Wrapper } from "components/layout";

import { Confirm, DatePicker, TimerGroup, TimerSubject } from "screens/sheets";

const EditStudylog = () => {
  const { params } = useRoute<RouteProp<PagesStackParamList, "EditStudylog">>();
  const navigation = useMainNavigation();

  const { colors } = useTheme();
  const { startLoading, endLoading } = useLoading();

  const confirmSheetRef = React.useRef<BottomSheetModal>(null);
  const subjectSheetRef = React.useRef<BottomSheetModal>(null);
  const groupSheetRef = React.useRef<BottomSheetModal>(null);
  const startSheetRef = React.useRef<BottomSheetModal>(null);
  const endSheetRef = React.useRef<BottomSheetModal>(null);

  const { refetch } = useGetStudylogDate({
    date: params.date,
  });
  const { data: detail, refetch: refetchDetail } = useGetStudylogDetailId(
    params.id,
  );
  const { data: categories } = useGetCategory();
  const data = React.useMemo(() => {
    if (detail === undefined || categories === undefined) return undefined;
    const subject = categories
      .map((category) => category.subjects)
      .flat()
      .find((subject) => subject.id === detail.subject_id);
    if (subject === undefined) return undefined;
    return {
      detail,
      subject,
    };
  }, [detail, categories]);

  const [subject, setSubject] = React.useState("");
  const [groups, setGroups] = React.useState<string[]>([]);
  const [content, setContent] = React.useState("");
  const [pass, setPass] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  const subjectValue = React.useMemo(() => {
    if (data === undefined) return "";
    return subject || data.subject.id;
  }, [subject, data]);
  const groupsValue = React.useMemo(() => {
    if (data === undefined) return [];
    return groups || data.detail.groups_to_share;
  }, [groups, data]);
  const contentValue = React.useMemo(() => {
    if (data === undefined) return "";
    return content || data.detail.content;
  }, [content, data]);
  const startTimeValue = React.useMemo(() => {
    if (data === undefined) return "";
    return startTime || data.detail.start_at;
  }, [startTime, data]);
  const endTimeValue = React.useMemo(() => {
    if (data === undefined) return "";
    return endTime || data.detail.end_at;
  }, [endTime, data]);

  const subjectView = React.useMemo(() => {
    if (categories === undefined)
      return {
        name: "",
        color: "",
      };
    const targetSubject = categories
      .map((category) => category.subjects)
      .flat()
      .find((s) => s.id === subjectValue);
    if (targetSubject === undefined)
      return {
        name: "",
        color: "",
      };
    return {
      name: targetSubject.name,
      color: targetSubject.color,
    };
  }, [categories, subjectValue]);

  const isChanged = React.useMemo(() => {
    if (data === undefined) return false;
    if (subject !== data.subject.id) return true;
    if (!compareArray(groups, data.detail.groups_to_share)) return true;
    if (content !== data.detail.content) return true;
    if (!moment(startTime).isSame(data.detail.start_at)) return true;
    if (!moment(endTime).isSame(data.detail.end_at)) return true;
    return false;
  }, [data, subject, groups, content, startTime, endTime]);

  React.useEffect(() => {
    if (data === undefined) return;
    setSubject(data.subject.id);
    setGroups(data.detail.groups_to_share);
    setContent(data.detail.content);
    setStartTime(new Date(data.detail.start_at));
    setEndTime(new Date(data.detail.end_at));
  }, [data]);

  const submit = async () => {
    startLoading();
    try {
      await putStudylogId(params.id, {
        subject_id: subject,
        groups_to_share: groups,
        content,
        start_at: moment(startTime).toISOString(),
        end_at: moment(endTime).toISOString(),
      });
      await refetch();
      await refetchDetail();
    } finally {
      endLoading();
    }
  };

  const remove = async () => {
    startLoading();
    try {
      await deleteStudylogId(params.id);
      await refetch();
      navigation.goBack();
    } finally {
      endLoading();
    }
  };

  return (
    <Container
      title="학습기록 수정"
      backable
      scrollable
      trailingIcon={{
        name: "Trash",
        color: colors.solid.red,
        onPress: () => {
          confirmSheetRef.current?.present();
        },
      }}
      button={{
        title: "변경사항 저장하기",
        disabled: !isChanged || !pass,
        onPress: submit,
      }}>
      <Wrapper data={data}>
        {(data) => (
          <VStack gap={800}>
            <CardItem
              title={data.subject.name}
              description={data.detail.content}
              color={data.subject.color}
            />
            <ButtonItem
              title="과목"
              leadingColor={subjectView.color}
              trailingIcon="ArrowsClockwise"
              subtitle={subjectView.name}
              onPress={() => {
                subjectSheetRef.current?.present();
              }}
            />
            <ButtonItem
              title="공유할 그룹"
              leadingIcon="ShareNetwork"
              trailingIcon="ArrowsClockwise"
              subtitle={
                groupsValue.length
                  ? `${groups.length}개의 그룹에 공유됨`
                  : "공유하지 않음"
              }
              onPress={() => {
                groupSheetRef.current?.present();
              }}
            />
            <InputItem
              title="공부 내용"
              placeholder="공부 내용을 입력해 주세요"
              icon="Notepad"
              value={contentValue}
              setValue={setContent}
              range={{
                min: 1,
                max: 30,
                pass,
                setPass,
              }}
            />
            <ButtonItem
              title="공부 시작 시간"
              leadingIcon="AlignLeft"
              trailingIcon="Clock"
              subtitle={timestamp(startTimeValue)}
              onPress={() => {
                startSheetRef.current?.present();
              }}
            />
            <ButtonItem
              title="공부 종료 시간"
              leadingIcon="AlignRight"
              trailingIcon="Clock"
              subtitle={timestamp(endTimeValue)}
              onPress={() => {
                endSheetRef.current?.present();
              }}
            />
          </VStack>
        )}
      </Wrapper>
      <TimerSubject
        sheetRef={subjectSheetRef}
        type="save"
        initial={subject}
        onSubmit={(subject) => {
          setSubject(subject);
          subjectSheetRef.current?.dismiss();
        }}
      />
      <TimerGroup
        sheetRef={groupSheetRef}
        initial={groups}
        onSubmit={(groups) => {
          setGroups(groups);
          groupSheetRef.current?.dismiss();
        }}
      />
      <Confirm
        sheetRef={confirmSheetRef}
        title="정말로 삭제하시겠습니까?"
        description="삭제된 학습기록은 복구할 수 없습니다."
        confirmText="삭제하기"
        cancelText="취소하기"
        onConfirm={remove}
      />
      <DatePicker
        sheetRef={startSheetRef}
        date={startTime}
        setDate={setStartTime}
      />
      <DatePicker sheetRef={endSheetRef} date={endTime} setDate={setEndTime} />
    </Container>
  );
};

export { EditStudylog };
